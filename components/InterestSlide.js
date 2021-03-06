import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TabActions, useNavigation } from "@react-navigation/native";
import { getValue, setValue } from "../helpers/Storage";
import { userApi } from "../api";
import ActivityCondition from "./ActivityCondition";

const InterestSlide = ({ isExtra, initialState, modifier }) => {
  const [selected, setSelected] = useState(initialState);

  const navigation = useNavigation();

  useEffect(async () => {
    if (isExtra) {
      const TValue = JSON.stringify(selected);
      await setValue("extraInterest", TValue);
    } else {
      const TValue = JSON.stringify(selected);
      await setValue("contestInterest", TValue);
    }
  }, [selected]);

  const setSelectedWith = (selected) => {
    setSelected(selected);
  };

  const btnAction = (isExtra) => {
    isExtra
      ? navigation.dispatch(TabActions.jumpTo("ContestInterest"))
      : navigation.popToTop();
  };

  const onPress = async () => {
    let typeCondition;
    let fieldCondition;
    let organizerCondition;
    let districtCondition;
    let prizeCondition;
    for (const [title, item] of Object.entries(selected)) {
      let condition = "";
      for (const [key, value] of Object.entries(item)) {
        if (value === true) {
          condition += `${key.substring(4)}+`;
        }
      }
      if (condition.length > 0) {
        condition = condition.substring(0, condition.length - 1);
      }
      if (isExtra) {
        if (title === "district") {
          districtCondition = condition;
        } else if (title == "field") {
          fieldCondition = condition;
        } else if (title == "organizer") {
          organizerCondition = condition;
        } else {
          typeCondition = condition;
        }
      } else {
        if (title === "prize") {
          prizeCondition = condition;
        } else if (title == "field") {
          fieldCondition = condition;
        } else if (title == "organizer") {
          organizerCondition = condition;
        } else {
          typeCondition = condition;
        }
      }
    }
    if (isExtra) {
      const extraInterest = {
        type: typeCondition,
        field: fieldCondition,
        organizer: organizerCondition,
        district: districtCondition,
      };
      const response = await userApi.setExtraInterest(extraInterest);
      if (response.ok) {
        const extra = await getValue("extraInterest");
        const parsed = await JSON.parse(extra);
        modifier(parsed);
      } else {
        Alert.alert("???????????? ??????", "???????????? ????????? ??????????????????.", [
          { text: "ok" },
        ]);
      }
    } else {
      const contestInterest = {
        type: typeCondition,
        field: fieldCondition,
        organizer: organizerCondition,
        prize: prizeCondition,
      };
      const response = await userApi.setContestInterest(contestInterest);
      if (response.ok) {
        const extra = await getValue("contestInterest");
        const parsed = await JSON.parse(extra);
        modifier(parsed);
      } else {
        Alert.alert("???????????? ??????", "???????????? ????????? ??????????????????.", [
          { text: "ok" },
        ]);
      }
    }
    btnAction(isExtra);
  };

  return (
    <View style={{ marginTop: 24, flex: 1 }}>
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-SemiBold",
              fontSize: 17,
              paddingBottom: 8,
            }}
          >
            {isExtra
              ? "?????? ??????????????? ????????????????"
              : "?????? ???????????? ????????????????"}
          </Text>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Regular",
              fontSize: 13,
              color: "#93929b",
            }}
          >
            ????????? ??? ?????? ?????????????????? ???????????? ??????????????????.
          </Text>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Regular",
              fontSize: 13,
              color: "#93929b",
            }}
          >
            ????????? ??????????????? ??????????????? ????????? ???????????????.
          </Text>
        </View>
        <View
          style={{
            marginTop: 24,
            marginHorizontal: 20,
          }}
        >
          <ActivityCondition
            isExtra={isExtra}
            previousSelected={selected}
            setSelectedWith={setSelectedWith}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#5a4cb3",
          height: 56,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Text
          style={{
            fontFamily: "AppleSDGothicNeo-SemiBold",
            fontSize: 17,
            color: "white",
          }}
        >
          {isExtra ? "??????" : "??????"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterestSlide;
