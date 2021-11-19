import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio,
  Dimensions,
  ScrollView,
} from "react-native";

import { getIcon } from "../helpers/Icons";
import { ActivityConditions } from "../ActivityConditions";
import FilterItem from "./FilterItem";

const dpi = PixelRatio.get();
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Filter = ({ isExtra, filter, filterWith, filtered, conditionsWith }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectSorter = (selected) => {
    closeModal();
    sortWith(selected);
  };

  const onPress = () => {
    let typeCondition;
    let fieldCondition;
    let organizerCondition;
    let districtCondition;
    let prizeCondition;
    for (const [title, item] of Object.entries(filter)) {
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
      conditionsWith({
        type: typeCondition,
        field: fieldCondition,
        organizer: organizerCondition,
        district: districtCondition,
      });
    } else {
      conditionsWith({
        type: typeCondition,
        field: fieldCondition,
        organizer: organizerCondition,
        prize: prizeCondition,
      });
    }
    closeModal();
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 20,
        }}
        activeOpacity={0.6}
        onPress={toggleModal}
      >
        <Image
          style={{ width: 21, height: 21, marginTop: 3 }}
          source={getIcon(dpi, "filter")}
        />
        <Text
          style={{
            color: "#111111",
            fontFamily: "AppleSDGothicNeo-Medium",
            fontSize: 15,
            marginLeft: 4,
            lineHeight: 20,
          }}
        >
          필터
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        backdropColor="#000000"
        backdropOpacity={0.8}
        onBackButtonPress={closeModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            height: SCREEN_HEIGHT / 1.4,
            width: SCREEN_WIDTH,
            justifyContent: "space-between",
          }}
        >
          <ScrollView
            style={{
              marginHorizontal: 20,
              marginTop: 36,
            }}
          >
            <View>
              {isExtra ? (
                <>
                  <FilterItem
                    title="활동유형"
                    activityType="extra"
                    category="type"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="활동분야"
                    activityType="extra"
                    category="field"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="주최사"
                    activityType="extra"
                    category="organizer"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="지역"
                    activityType="extra"
                    category="district"
                    filter={filter}
                    filterWith={filterWith}
                  />
                </>
              ) : (
                <>
                  <FilterItem
                    title="활동유형"
                    activityType="contest"
                    category="type"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="활동분야"
                    activityType="contest"
                    category="field"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="주최사"
                    activityType="contest"
                    category="organizer"
                    filter={filter}
                    filterWith={filterWith}
                  />
                  <FilterItem
                    title="시상내용"
                    activityType="contest"
                    category="prize"
                    filter={filter}
                    filterWith={filterWith}
                  />
                </>
              )}
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  marginLeft: 20,
                  height: 56,
                  width: "100%",
                  borderRadius: 16,
                  backgroundColor: "#5a4cb3",
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
                  선택완료
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default Filter;
