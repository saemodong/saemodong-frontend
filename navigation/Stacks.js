import React from "react";
import { Image, PixelRatio, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import InterestTabs from "./InterestTabs";

import { getIcon } from "../helpers/Icons";

const NativeStack = createNativeStackNavigator();
const dpi = PixelRatio.get();

const Stacks = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
  };
  return (
    <NativeStack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <NativeStack.Screen
        name="Interest"
        options={{
          title: "관심분야 설정",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: "AppleSDGothicNeo-Bold",
          },
          headerStyle: {
            height: 56,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={onPress}>
              <Image
                style={{ width: 24, height: 24, marginTop: 3 }}
                source={getIcon(dpi, "goback")}
              />
            </TouchableOpacity>
          ),
        }}
        component={InterestTabs}
      />
    </NativeStack.Navigator>
  );
};

export default Stacks;
