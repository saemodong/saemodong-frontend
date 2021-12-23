import React from "react";
import { PixelRatio, Image } from "react-native";
import styled from "styled-components/native";

export const IMAGES = {
  mdpi: {
    bottomtab_home: {
      focused: require("../assets/images/drawable-mdpi/bottomtab_home_focused.png"),
      unfocused: require("../assets/images/drawable-mdpi/bottomtab_home.png"),
    },
    bottomtab_bookmark: {
      focused: require("../assets/images/drawable-mdpi/bottomtab_bookmark_focused.png"),
      unfocused: require("../assets/images/drawable-mdpi/bottomtab_bookmark.png"),
    },
    bottomtab_notification: {
      focused: require("../assets/images/drawable-mdpi/bottomtab_notification_focused.png"),
      unfocused: require("../assets/images/drawable-mdpi/bottomtab_notification.png"),
    },
    bottomtab_mypage: {
      focused: require("../assets/images/drawable-mdpi/bottomtab_mypage_focused.png"),
      unfocused: require("../assets/images/drawable-mdpi/bottomtab_mypage.png"),
    },
    logo: require("../assets/images/drawable-mdpi/logo.png"),
    search: require("../assets/images/drawable-mdpi/search.png"),
    registered_tdy_focused: require("../assets/images/drawable-mdpi/registered_tdy_focused.png"),
    registered_tdy: require("../assets/images/drawable-mdpi/registered_tdy.png"),
    sorter: require("../assets/images/drawable-mdpi/sorter.png"),
    filter: require("../assets/images/drawable-mdpi/filter.png"),
    bookmark_marked: require("../assets/images/drawable-mdpi/bookmark_marked.png"),
    bookmark_unmarked: require("../assets/images/drawable-mdpi/bookmark_unmarked.png"),
    check: require("../assets/images/drawable-mdpi/check.png"),
    goback: require("../assets/images/drawable-mdpi/goback.png"),
    profile_default: require("../assets/images/drawable-mdpi/profile_default.png"),
    notification_read: require("../assets/images/drawable-mdpi/notification_read.png"),
  },
  hdpi: {
    bottomtab_home: {
      focused: require("../assets/images/drawable-hdpi/bottomtab_home_focused.png"),
      unfocused: require("../assets/images/drawable-hdpi/bottomtab_home.png"),
    },
    bottomtab_bookmark: {
      focused: require("../assets/images/drawable-hdpi/bottomtab_bookmark_focused.png"),
      unfocused: require("../assets/images/drawable-hdpi/bottomtab_bookmark.png"),
    },
    bottomtab_notification: {
      focused: require("../assets/images/drawable-hdpi/bottomtab_notification_focused.png"),
      unfocused: require("../assets/images/drawable-hdpi/bottomtab_notification.png"),
    },
    bottomtab_mypage: {
      focused: require("../assets/images/drawable-hdpi/bottomtab_mypage_focused.png"),
      unfocused: require("../assets/images/drawable-hdpi/bottomtab_mypage.png"),
    },
    logo: require("../assets/images/drawable-hdpi/logo.png"),
    search: require("../assets/images/drawable-hdpi/search.png"),
    registered_tdy_focused: require("../assets/images/drawable-hdpi/registered_tdy_focused.png"),
    registered_tdy: require("../assets/images/drawable-hdpi/registered_tdy.png"),
    sorter: require("../assets/images/drawable-hdpi/sorter.png"),
    filter: require("../assets/images/drawable-hdpi/filter.png"),
    bookmark_marked: require("../assets/images/drawable-hdpi/bookmark_marked.png"),
    bookmark_unmarked: require("../assets/images/drawable-hdpi/bookmark_unmarked.png"),
    check: require("../assets/images/drawable-hdpi/check.png"),
    goback: require("../assets/images/drawable-hdpi/goback.png"),
    profile_default: require("../assets/images/drawable-hdpi/profile_default.png"),
    notification_read: require("../assets/images/drawable-hdpi/notification_read.png"),
  },
  xhdpi: {
    bottomtab_home: {
      focused: require("../assets/images/drawable-xhdpi/bottomtab_home_focused.png"),
      unfocused: require("../assets/images/drawable-xhdpi/bottomtab_home.png"),
    },
    bottomtab_bookmark: {
      focused: require("../assets/images/drawable-xhdpi/bottomtab_bookmark_focused.png"),
      unfocused: require("../assets/images/drawable-xhdpi/bottomtab_bookmark.png"),
    },
    bottomtab_notification: {
      focused: require("../assets/images/drawable-xhdpi/bottomtab_notification_focused.png"),
      unfocused: require("../assets/images/drawable-xhdpi/bottomtab_notification.png"),
    },
    bottomtab_mypage: {
      focused: require("../assets/images/drawable-xhdpi/bottomtab_mypage_focused.png"),
      unfocused: require("../assets/images/drawable-xhdpi/bottomtab_mypage.png"),
    },
    logo: require("../assets/images/drawable-xhdpi/logo.png"),
    search: require("../assets/images/drawable-xhdpi/search.png"),
    registered_tdy_focused: require("../assets/images/drawable-xhdpi/registered_tdy_focused.png"),
    registered_tdy: require("../assets/images/drawable-xhdpi/registered_tdy.png"),
    sorter: require("../assets/images/drawable-xhdpi/sorter.png"),
    filter: require("../assets/images/drawable-xhdpi/filter.png"),
    bookmark_marked: require("../assets/images/drawable-xhdpi/bookmark_marked.png"),
    bookmark_unmarked: require("../assets/images/drawable-xhdpi/bookmark_unmarked.png"),
    check: require("../assets/images/drawable-xhdpi/check.png"),
    goback: require("../assets/images/drawable-xhdpi/goback.png"),
    profile_default: require("../assets/images/drawable-xhdpi/profile_default.png"),
    notification_read: require("../assets/images/drawable-xhdpi/notification_read.png"),
  },
  xxhdpi: {
    bottomtab_home: {
      focused: require("../assets/images/drawable-xxhdpi/bottomtab_home_focused.png"),
      unfocused: require("../assets/images/drawable-xxhdpi/bottomtab_home.png"),
    },
    bottomtab_bookmark: {
      focused: require("../assets/images/drawable-xxhdpi/bottomtab_bookmark_focused.png"),
      unfocused: require("../assets/images/drawable-xxhdpi/bottomtab_bookmark.png"),
    },
    bottomtab_notification: {
      focused: require("../assets/images/drawable-xxhdpi/bottomtab_notification_focused.png"),
      unfocused: require("../assets/images/drawable-xxhdpi/bottomtab_notification.png"),
    },
    bottomtab_mypage: {
      focused: require("../assets/images/drawable-xxhdpi/bottomtab_mypage_focused.png"),
      unfocused: require("../assets/images/drawable-xxhdpi/bottomtab_mypage.png"),
    },
    logo: require("../assets/images/drawable-xxhdpi/logo.png"),
    search: require("../assets/images/drawable-xxhdpi/search.png"),
    registered_tdy_focused: require("../assets/images/drawable-xxhdpi/registered_tdy_focused.png"),
    registered_tdy: require("../assets/images/drawable-xxhdpi/registered_tdy.png"),
    sorter: require("../assets/images/drawable-xxhdpi/sorter.png"),

    filter: require("../assets/images/drawable-xxhdpi/filter.png"),
    bookmark_marked: require("../assets/images/drawable-xxhdpi/bookmark_marked.png"),
    bookmark_unmarked: require("../assets/images/drawable-xxhdpi/bookmark_unmarked.png"),
    check: require("../assets/images/drawable-xxhdpi/check.png"),
    goback: require("../assets/images/drawable-xxhdpi/goback.png"),
    profile_default: require("../assets/images/drawable-xxhdpi/profile_default.png"),
    notification_read: require("../assets/images/drawable-xxhdpi/notification_read.png"),
  },
  xxxhdpi: {
    bottomtab_home: {
      focused: require("../assets/images/drawable-xxxhdpi/bottomtab_home_focused.png"),
      unfocused: require("../assets/images/drawable-xxxhdpi/bottomtab_home.png"),
    },
    bottomtab_bookmark: {
      focused: require("../assets/images/drawable-xxxhdpi/bottomtab_bookmark_focused.png"),
      unfocused: require("../assets/images/drawable-xxxhdpi/bottomtab_bookmark.png"),
    },
    bottomtab_notification: {
      focused: require("../assets/images/drawable-xxxhdpi/bottomtab_notification_focused.png"),
      unfocused: require("../assets/images/drawable-xxxhdpi/bottomtab_notification.png"),
    },
    bottomtab_mypage: {
      focused: require("../assets/images/drawable-xxxhdpi/bottomtab_mypage_focused.png"),
      unfocused: require("../assets/images/drawable-xxxhdpi/bottomtab_mypage.png"),
    },
    logo: require("../assets/images/drawable-xxxhdpi/logo.png"),
    search: require("../assets/images/drawable-xxxhdpi/search.png"),
    registered_tdy_focused: require("../assets/images/drawable-xxxhdpi/registered_tdy_focused.png"),
    registered_tdy: require("../assets/images/drawable-xxxhdpi/registered_tdy.png"),
    sorter: require("../assets/images/drawable-xxxhdpi/sorter.png"),
    filter: require("../assets/images/drawable-xxxhdpi/filter.png"),
    bookmark_marked: require("../assets/images/drawable-xxxhdpi/bookmark_marked.png"),
    bookmark_unmarked: require("../assets/images/drawable-xxxhdpi/bookmark_unmarked.png"),
    check: require("../assets/images/drawable-xxxhdpi/check.png"),
    goback: require("../assets/images/drawable-xxxhdpi/goback.png"),
    profile_default: require("../assets/images/drawable-xxxhdpi/profile_default.png"),
    notification_read: require("../assets/images/drawable-xxxhdpi/notification_read.png"),
  },
};
