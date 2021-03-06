import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import { getIcon } from "../helpers/Icons";
import { activityApi } from "../api";

const dpi = PixelRatio.get();
const SCREEN_WIDTH = Dimensions.get("window").width;

const getTerm = (openedAt, closedAt) =>
  `${openedAt.substring(0, 10).replace(/-/g, ".")} ~ ${closedAt
    .substring(0, 10)
    .replace(/-/g, ".")}`;

const getDday = (year, month, day) => {
  const closedDate = new Date(year, parseInt(month) - 1, day);
  const today = new Date();
  const gap = closedDate.getTime() - today.getTime();
  const dday = Math.ceil(gap / (1000 * 60 * 60 * 24));
  return dday;
};

const ActivityPreview = ({
  id,
  name,
  openedAt,
  closedAt,
  type,
  field,
  marked,
  url,
  updateLoad,
}) => {
  const [bookmarked, setBookmarked] = useState(marked);

  const onPress = async () => {
    await updateLoad(true);
    if (!bookmarked) {
      await activityApi.mark(id);
    } else {
      await activityApi.unmark(id);
    }
    setBookmarked(!bookmarked);
  };

  const _handlePressButtonAsync = async () => {
    await WebBrowser.openBrowserAsync(url, {
      showTitle: true,
    });
  };

  const term = getTerm(openedAt, closedAt);
  const dday = getDday(
    closedAt.substring(0, 4),
    closedAt.substring(5, 7),
    closedAt.substring(8, 10)
  );

  const ifExist = name.length > 0;

  return ifExist ? (
    <View
      style={{
        height: 102,
        width: SCREEN_WIDTH,
        borderBottomColor: "#0c111111",
        borderBottomWidth: 1,
        backgroundColor: dday >= 0 ? "white" : "#fafafa",
      }}
    >
      <TouchableOpacity onPress={_handlePressButtonAsync}>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 102,
            paddingHorizontal: 20,
            paddingTop: 18,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItem: "center",
              height: 24,
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                width: 288,
                height: 20,
                fontFamily: "AppleSDGothicNeo-Medium",
                fontSize: 15,
                color: dday >= 0 ? "#111111" : "#93929b",
                marginVertical: 2,
              }}
              numberOfLines={1}
            >
              {name.trim()}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onPress}
              activeOpacity={0.6}
            >
              {/* <Bookmark marked={bookmarked} /> */}
              {bookmarked ? (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}
                  source={getIcon(dpi, "bookmark_marked")}
                />
              ) : (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}
                  source={getIcon(dpi, "bookmark_unmarked")}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
            }}
          >
            <View>
              <Text
                style={{
                  height: 16,
                  fontFamily: "AppleSDGothicNeo-Regular",
                  fontSize: 13,
                  color: "#93929b",
                }}
              >
                {term}
              </Text>
              <Text
                style={{
                  height: 16,
                  fontFamily: "AppleSDGothicNeo-Regular",
                  fontSize: 13,
                  color: "#93929b",
                  marginTop: 5,
                }}
              >
                {field.map((item, index, { length }) => {
                  if (length - 1 === index) {
                    return <Text key={index}>{item}</Text>;
                  } else {
                    return <Text key={index}>{item} ??</Text>;
                  }
                })}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              {dday >= 0 ? (
                <View
                  style={{
                    height: 20,
                    backgroundColor: "#f1f0f3",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#111111",
                      fontSize: 13,
                      fontFamily: "AppleSDGothicNeo-Medium",
                      marginHorizontal: 5,
                    }}
                  >
                    {dday > 0 ? `D-${dday}` : "D-day"}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    height: 20,
                    backgroundColor: "#d9d9dc",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 13,
                      fontFamily: "AppleSDGothicNeo-Medium",
                      marginHorizontal: 5,
                    }}
                  >
                    ??????
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default ActivityPreview;
