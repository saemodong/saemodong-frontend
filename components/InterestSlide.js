import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TabActions, useNavigation } from "@react-navigation/native";

import FilterItem from "../components/FilterItem";
import { getValue, setValue } from "../helpers/Storage";
import { userApi } from "../api";

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

  const selectedWith = (selected) => {
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
        Alert.alert("네트워크 오류", "변경사항 저장에 실패했습니다.", [
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
        Alert.alert("네트워크 오류", "변경사항 저장에 실패했습니다.", [
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
              ? "어떤 대외활동을 찾으시나요?"
              : "어떤 공모전을 찾으시나요?"}
          </Text>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Regular",
              fontSize: 13,
              color: "#93929b",
            }}
          >
            나에게 딱 맞는 대외활동이나 공모전을 추천해드려요.
          </Text>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Regular",
              fontSize: 13,
              color: "#93929b",
            }}
          >
            알림을 받으시려면 관심분야를 탭하여 설정하세요.
          </Text>
        </View>
        <View
          style={{
            marginTop: 24,
            marginHorizontal: 20,
          }}
        >
          {isExtra ? (
            <>
              <FilterItem
                title="활동유형"
                activityType="extra"
                category="type"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="활동분야"
                activityType="extra"
                category="field"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="주최사"
                activityType="extra"
                category="organizer"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="지역"
                activityType="extra"
                category="district"
                filter={selected}
                filterWith={selectedWith}
              />
            </>
          ) : (
            <>
              <FilterItem
                title="공모분야"
                activityType="contest"
                category="type"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="공모주제"
                activityType="contest"
                category="field"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="주최사"
                activityType="contest"
                category="organizer"
                filter={selected}
                filterWith={selectedWith}
              />
              <FilterItem
                title="시상내용"
                activityType="contest"
                category="prize"
                filter={selected}
                filterWith={selectedWith}
              />
            </>
          )}
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
          {isExtra ? "다음" : "완료"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InterestSlide;
