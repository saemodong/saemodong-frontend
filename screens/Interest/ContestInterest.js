import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import InterestSlide from "../../components/InterestSlide";
import { userApi } from "../../api";
import { ExtraSelected, ContestSelected } from "../../ActivityConditions";
import { getValue, setValue } from "../../helpers/Storage";

const ContestInterest = () => {
  const [userContestInterest, setUserContestInterest] =
    useState(ContestSelected);
  const [ready, setReady] = useState(false);

  const userContestInterestWith = (userContestInterest) => {
    setUserContestInterest(userContestInterest);
  };

  const getUserInterest = async () => {
    let contestTypeObject = ContestSelected.type;
    let contestFieldObject = ContestSelected.field;
    let contestOrganizerObject = ContestSelected.organizer;
    let contestPrizeObject = ContestSelected.prize;

    const contestResponse = await userApi.getContestInterest();

    if (contestResponse.ok) {
      const { result: contestInterest } = await contestResponse.json();
      for (const [key, value] of Object.entries(contestInterest)) {
        if (value.length > 0) {
          const valueToList = value.split("+");
          valueToList.forEach((value) => {
            if (key === "type") {
              contestTypeObject = {
                ...contestTypeObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "field") {
              contestFieldObject = {
                ...contestFieldObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "organizer") {
              contestOrganizerObject = {
                ...contestOrganizerObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "prize") {
              contestPrizeObject = {
                ...contestPrizeObject,
                [`btn_${value}`]: true,
              };
            }
          });
        }
      }
    } else {
      Alert.alert("네트워크 오류", "관심분야 로드에 실패했습니다.", [
        { text: "ok" },
      ]);
    }

    setUserContestInterest({
      type: { ...contestTypeObject },
      field: {
        ...contestFieldObject,
      },
      organizer: {
        ...contestOrganizerObject,
      },
      prize: {
        ...contestPrizeObject,
      },
    });
  };
  const setUserInterest = async () => {
    await setValue("contestInterest", JSON.stringify(userContestInterest));
  };

  useEffect(async () => {
    await getUserInterest();
    await setUserInterest();
    await setReady(true);
  }, []);

  return ready ? (
    <InterestSlide
      isExtra={false}
      initialState={userContestInterest}
      modifier={userContestInterestWith}
    />
  ) : null;
};

export default ContestInterest;
