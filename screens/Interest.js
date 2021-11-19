import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Swiper from "react-native-web-swiper";

import Extra from "./Extra";
import InterestSlide from "../components/InterestSlide";
import { userApi } from "../api";
import { ExtraSelected, ContestSelected } from "../ActivityConditions";
import { getValue, setValue } from "../helpers/Storage";

const Interest = () => {
  const [userExtraInterest, setUserExtraInterest] = useState(ExtraSelected);
  const [userContestInterest, setUserContestInterest] =
    useState(ContestSelected);
  const [ready, setReady] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);

  const userExtraInterestWith = (userExtraInterest) => {
    setUserExtraInterest(userExtraInterest);
  };

  const userContestInterestWith = (userContestInterest) => {
    setUserContestInterest(userContestInterest);
  };

  const getUserInterest = async () => {
    let extraTypeObject = ExtraSelected.type;
    let extraFieldObject = ExtraSelected.field;
    let extraOrganizerObject = ExtraSelected.organizer;
    let extraDistrictObject = ExtraSelected.district;
    let contestTypeObject = ContestSelected.type;
    let contestFieldObject = ContestSelected.field;
    let contestOrganizerObject = ContestSelected.organizer;
    let contestPrizeObject = ContestSelected.prize;

    const extraResponse = await userApi.getExtraInterest();
    const contestResponse = await userApi.getContestInterest();

    if (extraResponse.ok && contestResponse.ok) {
      const { result: extraInterest } = await extraResponse.json();
      for (const [key, valueStr] of Object.entries(extraInterest)) {
        if (valueStr.length > 0) {
          const valueToList = valueStr.split("+");
          valueToList.forEach((value, index, array) => {
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
      const { result: contestInterest } = await contestResponse.json();
      for (const [key, value] of Object.entries(contestInterest)) {
        if (value.length > 0) {
          const valueToList = value.split("+");
          valueToList.forEach((value, index, array) => {
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
    setUserExtraInterest({
      type: { ...extraTypeObject },
      field: { ...extraFieldObject },
      organizer: { ...extraOrganizerObject },
      district: { ...extraDistrictObject },
    });
    setUserContestInterest({
      ...contestTypeObject,
      ...contestFieldObject,
      ...contestOrganizerObject,
      ...contestPrizeObject,
    });
  };

  const setUserInterest = async () => {
    await setValue("fixedExtraInterest", JSON.stringify(userExtraInterest));
    await setValue("recentExtraInterest", JSON.stringify(userExtraInterest));
    await setValue("fixedContestInterest", JSON.stringify(userContestInterest));
    await setValue(
      "recentContestInterest",
      JSON.stringify(userContestInterest)
    );
  };

  useEffect(async () => {
    await getUserInterest();
    await setUserInterest();
    await setReady(true);
  }, []);

  // useEffect(async () => {
  //   setReady(false);
  //   const extraInterest = await getValue("recentExtraInterest");
  //   setUserExtraInterest(JSON.parse(extraInterest));

  //   setReady(true);
  // }, [reload]);

  const renderSwiper = () => {
    return (
      <Swiper
        controlsProps={{
          prevTitle: "",
          nextTitle: "",
          DotComponent: ({ index, isActive, onPress }) => (
            <View
              style={{
                backgroundColor: isActive ? "#5a4cb3" : "#ccc8e7",
                borderRadius: 5,
                marginHorizontal: 4,
                marginBottom: 150,
                height: 10,
                width: 10,
              }}
            ></View>
          ),
        }}
        onIndexChanged={(index) => setCurrIndex(index)}
      >
        <InterestSlide
          isExtra={true}
          initialState={userExtraInterest}
          modifier={userExtraInterestWith}
        />
        <InterestSlide
          isExtra={false}
          initialState={userContestInterest}
          modifier={userContestInterestWith}
        />
      </Swiper>
    );
  };
  const [swiper, setSwiper] = useState(renderSwiper);
  console.log(userExtraInterest);
  return ready ? <View style={{ flex: 1 }}>{swiper}</View> : null;
};

export default Interest;
