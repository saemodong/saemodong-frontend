import React from "react";
import { View, Text, Image, PixelRatio } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Extra_1, Extra_2, Contest_1, Contest_2 } from "../screens/Interest";
import { getIcon } from "../helpers/Icons";

const Tab = createMaterialTopTabNavigator();
const dpi = PixelRatio.get();

const TabBar = ({ state, descriptors, navigation, position }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 24,
    }}
  >
    {state.routes.map((route, index) => {
      const label = route.name;
      const isFocused = state.index === index;

      return (
        <View
          style={{
            backgroundColor: "#5a4cb3",
            borderRadius: 16,
            height: 8,
            width: 8,
            marginHorizontal: 8,
          }}
        ></View>
      );
    })}
  </View>
);

const InterestTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Extra_1" component={Extra_1} />
      <Tab.Screen name="Extra_2" component={Extra_2} />
      <Tab.Screen name="Contest_1" component={Contest_1} />
      <Tab.Screen name="Contest_2" component={Contest_2} />
    </Tab.Navigator>
  );
};

export default InterestTabs;
