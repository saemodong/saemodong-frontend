import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  BackHandler,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
  LogBox,
} from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";

import Root from "./navigation/Root";
import Tabs from "./navigation/Tabs";
import RegisterStack from "./navigation/RegisterStack";
import { activityApi, userApi } from "./api";
import { getValue, setValue, flush } from "./helpers/Storage";

LogBox.ignoreLogs(["Setting a timer"]);

const customFonts = {
  "AppleSDGothicNeo-Regular": require("./assets/fonts/AppleSDGothicNeoR.ttf"),
  "AppleSDGothicNeo-Medium": require("./assets/fonts/AppleSDGothicNeoM.ttf"),
  "AppleSDGothicNeo-SemiBold": require("./assets/fonts/AppleSDGothicNeoSB.ttf"),
  "AppleSDGothicNeo-Bold": require("./assets/fonts/AppleSDGothicNeoB.ttf"),
  "AppleSDGothicNeo-Heavy": require("./assets/fonts/AppleSDGothicNeoH.ttf"),
};

const containerHeight =
  StatusBar.currentHeight <= 25 ? StatusBar.currentHeight : 0;

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const [dpi, setDpi] = useState(0);
  const [keyValid, setKeyValid] = useState(false);
  // const [homeMainData, setHomeMainData] = useState([]);

  const keyValidator = (keyValid) => {
    setKeyValid(keyValid);
  };

  // TODO 와이파이 없으면 어떻게 대응할지

  const getApiKey = async () => {
    const apiKey = await getValue("apiKey");
    if (apiKey !== null) {
      const response = await userApi.login(apiKey);
      const data = await response.json();
      if (response.ok) {
        setKeyValid(true);
        await setValue("nickname", data.result.nickname);
        await setValue("feedbackUrl", data.result.feedbackUrl);
      } else {
        Alert.alert(data.message, "", [
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ]);
      }
    }
  };

  const startLoading = async () => {
    const fonts = Font.loadAsync(customFonts);
    const dpis = setDpi(PixelRatio.get());
    const validation = getApiKey();
    // const data = setHomeMainData(await homeApi.main());
    // await Promise.all([fonts, dpis, data]);
    await Promise.all([fonts, dpis, validation]);
  };

  const onFinish = () => {
    setReady(true);
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={() => null}
      />
    );
  }

  if (dpi === 0.75) {
    Alert.alert("미지원 기기", "지원되지 않는 기기입니다😢", [
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
  }

  return (
    <View style={{ flex: 1, paddingTop: containerHeight }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {keyValid ? <Root /> : <RegisterStack keyValidator={keyValidator} />}
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}
