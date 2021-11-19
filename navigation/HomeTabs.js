import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";

const TopTab = createMaterialTopTabNavigator();

const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeTabs = ({ state, descriptors, navigation, position }) => (
  <View
    style={{
      backgroundColor: "white",
      height: 40,
      borderBottomColor: "#0c111111",
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }}
  >
    {state.routes.map((route, index) => {
      const label = route.name;
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableOpacity
          key={`hometab_${index}`}
          onPress={onPress}
          activeOpacity={0.8}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: SCREEN_WIDTH / 3,
            borderBottomWidth: 2,
            borderBottomColor: isFocused ? "#5a4cb3" : "transparent",
          }}
        >
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-Bold",
              fontSize: 15,
              color: isFocused ? "#5a4cb3" : "#b5b4bc",
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default HomeTabs;
