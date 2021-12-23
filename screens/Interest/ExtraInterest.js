import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import InterestSlide from "../../components/InterestSlide";
import { userApi } from "../../api";
import { ExtraSelected, ContestSelected } from "../../ActivityConditions";
import { getValue, setValue } from "../../helpers/Storage";

const ExtraInterest = () => {
  const [userExtraInterest, setUserExtraInterest] = useState(ExtraSelected);
  const [ready, setReady] = useState(false);

  const userExtraInterestWith = (userExtraInterest) => {
    setUserExtraInterest(userExtraInterest);
  };

  const getUserInterest = async () => {
    let extraTypeObject = ExtraSelected.type;
    let extraFieldObject = ExtraSelected.field;
    let extraOrganizerObject = ExtraSelected.organizer;
    let extraDistrictObject = ExtraSelected.district;

    const extraResponse = await userApi.getExtraInterest();

    if (extraResponse.ok) {
      const { result: extraInterest } = await extraResponse.json();
      for (const [key, valueStr] of Object.entries(extraInterest)) {
        if (valueStr.length > 0) {
          const valueToList = valueStr.split("+");
          valueToList.forEach((value) => {
            if (key === "type") {
              extraTypeObject = {
                ...extraTypeObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "field") {
              extraFieldObject = {
                ...extraFieldObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "organizer") {
              extraOrganizerObject = {
                ...extraOrganizerObject,
                [`btn_${value}`]: true,
              };
            }
            if (key === "district") {
              extraDistrictObject = {
                ...extraDistrictObject,
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
    setUserExtraInterest({
      type: { ...extraTypeObject },
      field: { ...extraFieldObject },
      organizer: { ...extraOrganizerObject },
      district: { ...extraDistrictObject },
    });
  };

  const setUserInterest = async () => {
    await setValue("extraInterest", JSON.stringify(userExtraInterest));
  };

  useEffect(async () => {
    await getUserInterest();
    await setUserInterest();
    setReady(true);
  }, []);

  return ready ? (
    <InterestSlide
      isExtra={true}
      initialState={userExtraInterest}
      modifier={userExtraInterestWith}
    />
  ) : null;
};

export default ExtraInterest;
