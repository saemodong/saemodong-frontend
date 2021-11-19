import React from "react";
import { View, Text, PixelRatio, Dimensions, StatusBar } from "react-native";
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Main from "./Main";
import Extra from "./Extra";
import Contest from "./Contest";
import HomeTabs from "../../navigation/HomeTabs";

const TopTab = createMaterialTopTabNavigator();

const Home = () => (
  <TopTab.Navigator
    initialLayout={{ width: Dimensions.get("window").width }}
    tabBar={(props) => (
      <View style={{}}>
        <HomeTabs {...props} />
      </View>
    )}
    sceneContainerStyle={{ backgroundColor: "white" }}
  >
    <TopTab.Screen name="전체" component={Main} />
    <TopTab.Screen name="대외활동" component={Extra} />
    <TopTab.Screen name="공모전" component={Contest} />
  </TopTab.Navigator>
);

export default Home;
