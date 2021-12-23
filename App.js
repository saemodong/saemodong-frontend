import React, { useState, useEffect } from "react";
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
import messaging from "@react-native-firebase/messaging";

import Root from "./navigation/Root";
import Tabs from "./navigation/Tabs";
import RegisterStack from "./navigation/RegisterStack";
import { activityApi, userApi, notificationApi } from "./api";
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
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("알림 테스트", JSON.stringify(remoteMessage));
      console.log(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const [ready, setReady] = useState(false);
  const [dpi, setDpi] = useState(0);
  const [keyValid, setKeyValid] = useState(false);

  const keyValidator = (keyValid) => {
    setKeyValid(keyValid);
  };

  // TODO 와이파이 없으면 어떻게 대응할지

  useEffect(() => {
    getApiKey();
  }, []);

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    const storedToken = await getValue("fcmToken");
    if (
      storedToken === null ||
      (storedToken !== null && token !== storedToken)
    ) {
      const response = await notificationApi.updateToken(token);
      if (response.ok) {
        await setValue("fcmToken", token);
      } else {
        // TODO Error Handling + Logging
      }
    }
  };

  const getApiKey = async () => {
    const apiKey = await getValue("apiKey");

    if (apiKey !== null) {
      const response = await userApi.login(apiKey);
      const data = await response.json();
      if (response.ok) {
        setKeyValid(true);
        await setValue("nickname", data.result.nickname);
        if (!data.result.feedbackUrl) {
          await setValue("feedbackUrl", "");
        } else {
          await setValue(
            "feedbackUrl",
            JSON.stringify(data.result.feedbackUrl)
          );
        }
      } else {
        Alert.alert(data.message, "", [
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ]);
      }
    }
  };

  if (dpi === 0.75) {
    Alert.alert("미지원 기기", "지원되지 않는 기기입니다😢", [
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
  }

  if (keyValid) {
    getFcmToken();
  }

  const startLoading = async () => {
    const fonts = Font.loadAsync(customFonts);
    const dpis = setDpi(PixelRatio.get());
    await Promise.all([fonts, dpis]);
  };

  const onFinish = () => {
    setReady(true);
  };

  return ready ? (
    <View style={{ flex: 1, paddingTop: containerHeight }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {keyValid ? <Root /> : <RegisterStack keyValidator={keyValidator} />}
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  ) : (
    <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={() => null}
    />
  );
}
