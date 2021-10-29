import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";

import Home from "../screens/Home";
import Bookmark from "../screens/Bookmark";
import Notification from "../screens/Notification";
import MyPage from "../screens/MyPage";
import { ICON, getIcon } from "../helpers/Images";

const Tab = createBottomTabNavigator();

const Tabs = ({ dpi }) => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getIcon(dpi, focused, route.name);
        },
        tabBarStyle: { height: 56 },
        tabBarActiveTintColor: "#5a4cb3",
        tabBarInactiveTintColor: "#ccc8e7",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="home" component={Home} />
      {/* <Tab.Screen name="북마크" component={Bookmark} />
      <Tab.Screen name="알림" component={Notification} />
      <Tab.Screen name="마이페이지" component={MyPage} /> */}
    </Tab.Navigator>
  );
};

export default Tabs;
