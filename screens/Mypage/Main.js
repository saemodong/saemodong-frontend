import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Alert,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

import {getIcon} from "../../helpers/Icons";
import {getValue} from "../../helpers/Storage";
import {FEEDBACK_URL} from "@env";

const dpi = PixelRatio.get();
const SCREEN_WIDTH = Dimensions.get("window").width;

const Main = () => {
  const [nickname, setNickname] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getNickname();
  }, []);

  const getNickname = async () => {
    const nickname = await getValue("nickname");
    setNickname(nickname);
  };

  const onPressInterest = () => {
    navigation.navigate("Stacks", {
      screen: "Interest",
    });
  };

  const onPressFeedback = async () => {
    await WebBrowser.openBrowserAsync(FEEDBACK_URL);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fafafa",
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: SCREEN_WIDTH,
            height: 80,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 60,
              backgroundColor: "white",
              borderColor: "rgba(0, 0, 0, 0.09)",
              borderWidth: 1,
            }}
          >
            <Image
              style={{flex: 1, width: undefined, height: undefined}}
              source={getIcon(dpi, "profile_default")}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
              height: 80,
            }}
          >
            <Text
              style={{fontFamily: "AppleSDGothicNeo-SemiBold", fontSize: 17}}
            >
              {nickname}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            paddingVertical: 18,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={{
              height: 36,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
            activeOpacity={0.8}
            // TODO ????????? ?????? onPress??? ????????????.
          >
            <Text>????????? ??????</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View>
        <View style={{paddingBottom: 4, paddingLeft: 20}}>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-SemiBold",
              fontSize: 13,
              color: "#b5b4bc",
            }}
          >
            ????????? ??????
          </Text>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 48,
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.04)",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            style={{paddingLeft: 20}}
            activeOpacity={0.6}
            onPress={onPressInterest}
          >
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-SemiBold",
                fontSize: 15,
              }}
            >
              ???????????? ??????
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: SCREEN_WIDTH,
            height: 48,
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.04)",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity style={{ paddingLeft: 20 }} activeOpacity={0.6}>
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-SemiBold",
                fontSize: 15,
              }}
            >
              ?????? ??????
            </Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.04)",
            height: 20,
          }}
        ></View>
        <View style={{paddingBottom: 4, paddingLeft: 20}}>
          <Text
            style={{
              fontFamily: "AppleSDGothicNeo-SemiBold",
              fontSize: 13,
              color: "#b5b4bc",
            }}
          >
            ????????????
          </Text>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 48,
            justifyContent: "center",
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.04)",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            style={{paddingLeft: 20}}
            activeOpacity={0.6}
            onPress={onPressFeedback}
          >
            <Text
              style={{
                fontFamily: "AppleSDGothicNeo-SemiBold",
                fontSize: 15,
              }}
            >
              ????????? ?????????
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.04)",
            height: 8,
          }}
        ></View>
      </View>
    </View>
  );
};

export default Main;
