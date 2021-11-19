import React from "react";
import { Image, PixelRatio, StatusBar, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from "styled-components/native";

import Home from "../screens/Home/Home";
import Bookmark from "../screens/Bookmark/Bookmark";
import Notification from "../screens/Notification";
import MyPage from "../screens/MyPage";
import { getTabIcon } from "../helpers/TabIcons";
import { getIcon } from "../helpers/Icons";

const Tab = createBottomTabNavigator();
const dpi = PixelRatio.get();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getTabIcon(dpi, focused, route.name);
        },
        tabBarStyle: {
          height: 56,
          elevation: 0,
          borderTopColor: "#f8f8f9",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#5a4cb3",
        tabBarInactiveTintColor: "#ccc8e7",
        tabBarShowLabel: false,
        headerStyle: {
          height: 56,
          elevation: 0,
          borderBottomColor: "white",
          borderBottomWidth: 1,
        },
      })}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              style={{ width: 80, height: 40 }}
              source={getIcon(dpi, "logo")}
            />
          ),
          headerTitleStyle: {
            marginVertical: 8,
            marginLeft: 40,
          },
          // headerRight: () => (
          //   <Image
          //     style={{ width: 30, height: 30 }}
          //     source={getIcon(dpi, "search")}
          //   />
          // ),
          // headerRightContainerStyle: {
          //   marginVertical: 13,
          //   paddingRight: 20,
          // },
        }}
      />
      <Tab.Screen
        name="bookmark"
        component={Bookmark}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-Heavy",
                fontSize: 23,
                color: "#5a4cb3",
              }}
            >
              북마크
            </Text>
          ),
          headerTitleStyle: {
            marginHorizontal: 8,
            marginLeft: 20,
            width: 60,
            height: 28,
          },
          headerStyle: {
            height: 56,
            elevation: 0,
            borderBottomColor: "#0c111111",
            borderBottomWidth: 1,
          },
        }}
      />
      <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-Heavy",
                fontSize: 23,
                color: "#5a4cb3",
              }}
            >
              알림
            </Text>
          ),
          headerTitleStyle: {
            marginHorizontal: 8,
            marginLeft: 20,
            width: 60,
            height: 28,
          },
          headerStyle: {
            height: 56,
            elevation: 0,
            borderBottomColor: "#0c111111",
            borderBottomWidth: 1,
          },
        }}
      />
      <Tab.Screen
        name="mypage"
        component={MyPage}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-Heavy",
                fontSize: 23,
                color: "#5a4cb3",
              }}
            >
              마이페이지
            </Text>
          ),
          headerTitleStyle: {
            marginHorizontal: 8,
            marginLeft: 20,
            width: 60,
            height: 28,
          },
          headerStyle: {
            height: 56,
            elevation: 0,
            borderBottomColor: "#0c111111",
            borderBottomWidth: 1,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
