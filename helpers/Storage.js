import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValue = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // TODO 에러 핸들링
  }
};

export const setValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // TODO 에러 핸들링
  }
};

export const flush = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // TODO 에러 핸들링
  }
};
