import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  BackHandler,
  Alert,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/Tabs";

const customFonts = {
  "AppleSDGothicNeo-Regular": require("./assets/fonts/AppleSDGothicNeoR.ttf"),
  "AppleSDGothicNeo-Medium": require("./assets/fonts/AppleSDGothicNeoM.ttf"),
  "AppleSDGothicNeo-SemiBold": require("./assets/fonts/AppleSDGothicNeoSB.ttf"),
  "AppleSDGothicNeo-Bold": require("./assets/fonts/AppleSDGothicNeoB.ttf"),
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [dpi, setDpi] = useState(0);

  const startLoading = async () => {
    await Font.loadAsync(customFonts);
    setDpi(PixelRatio.get());
  };

  const onFinish = () => setReady(true);

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={() => null}
      />
    );
  }

  if (dpi === 0.75 || dpi === 4) {
    Alert.alert("미지원 기기", "지원되지 않는 기기입니다😢", [
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
  }

  return (
    <NavigationContainer>
      <Tabs dpi={dpi} />
    </NavigationContainer>
  );
}
