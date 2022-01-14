import React from "react";
import {View, PixelRatio} from "react-native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import ExtraInterest from "../screens/Mypage/UserInterest/ExtraInterest";
import ContestInterest from "../screens/Mypage/UserInterest/ContestInterest";

const Tab = createMaterialTopTabNavigator();

const TabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
      }}
    >
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        return (
          <View
            key={index}
            style={{
              backgroundColor: isFocused ? "#5a4cb3" : "#ccc8e7",
              borderRadius: 16,
              height: 8,
              width: 8,
              marginHorizontal: 4,
            }}
          ></View>
        );
      })}
    </View>
  );
};

const InterestTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="ExtraInterest" component={ExtraInterest}/>
      <Tab.Screen name="ContestInterest" component={ContestInterest}/>
    </Tab.Navigator>
  );
};

export default InterestTabs;
