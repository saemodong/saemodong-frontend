import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ActivityConditions } from "../ActivityConditions";

const FilterItem = ({ title, activityType, category, filter, filterWith }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontFamily: "AppleSDGothicNeo-SemiBold",
          fontSize: 17,
          paddingBottom: 8,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {ActivityConditions[activityType][category].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              onPress={() => {
                let T = new Object();
                T[category] = {
                  ...filter[category],
                  [`btn_${index}`]: !filter[category][`btn_${index}`],
                };
                filterWith({ ...filter, ...T });
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: filter[category][`btn_${index}`]
                    ? "white"
                    : "rgba(0, 0, 0, 0.09)",
                  backgroundColor: filter[category][`btn_${index}`]
                    ? "#5a4cb3"
                    : "white",
                  borderRadius: 18,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  marginRight: 4,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: filter[category][`btn_${index}`] ? "white" : "black",
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FilterItem;
