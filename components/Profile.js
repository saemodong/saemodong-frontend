import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
} from "react-native";

import { getIcon } from "../helpers/Icons";
import { userApi } from "../api";
import { getValue, setValue } from "../helpers/Storage";

const dpi = PixelRatio.get();
const SCREEN_WIDTH = Dimensions.get("window").width;

const Profile = ({ keyValidator }) => {
  const [nickname, setNickname] = useState("");

  const onChangeText = (text) =>
    text.length < 10 ? setNickname(text.replace(/\s/g, "").trim()) : null;

  const updateUserInfo = async () => {
    const nicknameObject = {
      nickname,
    };
    const apiKey = await getValue("apiKey");
    if (apiKey === null) {
      const response = await userApi.register(nicknameObject);

      if (response.ok) {
        const { result } = await response.json();
        await setValue("apiKey", result.apiKey);
        await setValue("nickname", result.nickname);
        await setValue("feebackUrl", result.feedbackUrl);

        keyValidator(true);
      } else {
        // TODO 에러 핸들링
        Alert.alert("사용자 정보를 생성할 수 없습니다", "", [
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ]);
      }
    } else {
      keyValidator(true);
    }
  };

  const onPress = () => {
    if (nickname.length > 0) {
      updateUserInfo();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={{
        flex: 1,
        backgroundColor: "#fafafa",
        borderTopColor: "rgba(0, 0, 0, 0.09)",
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          marginTop: 24,
          marginBottom: 20,
          height: 122,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "white",
            borderColor: "rgba(0, 0, 0, 0.09)",
            borderWidth: 1,
          }}
        >
          <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={getIcon(dpi, "profile_default")}
          />
        </View>
      </View>
      <View>
        <View style={{ height: 20 }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "AppleSDGothicNeo-Bold",
              paddingLeft: 20,
              paddingBottom: 2,
            }}
          >
            닉네임
          </Text>
        </View>
        <View
          style={{
            height: 56,
            width: SCREEN_WIDTH,
          }}
        >
          <TextInput
            placeholder="닉네임"
            placeholderTextColor="#d5d5d5"
            onChangeText={onChangeText}
            value={nickname}
            style={{
              height: 56,
              marginRight: 20,
              marginLeft: 20,
              borderRadius: 16,
              backgroundColor: "white",
              borderColor: "rgba(0, 0, 0, 0.09)",
              borderWidth: 1,
              fontFamily: "AppleSDGothicNeo-SemiBold",
              fontSize: 17,
              paddingLeft: 16,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            marginBottom: 20,
            marginRight: 20,
            marginLeft: 20,
            height: 56,
            borderRadius: 16,
            backgroundColor: nickname.length > 0 ? "#5a4cb3" : "#d5d5d5",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPress}
          activeOpacity={nickname.length > 0 ? 0.6 : 1}
        >
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-SemiBold",
              fontSize: 17,
              color: "white",
            }}
          >
            완료
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;
