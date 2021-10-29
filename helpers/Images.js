import React from "react";
import styled from "styled-components/native";

const TabIcon = styled.Image`
  width: 60px;
  height: 41px;
`;

export const getIcon = (dpi, focused, icon) => {
  if (dpi === 1) {
    return (
      <TabIcon
        source={focused ? ICON.mdpi[icon].focused : ICON.mdpi[icon].unfocused}
      />
    );
  } else if (dpi === 1.5) {
    return (
      <TabIcon
        source={focused ? ICON.hdpi[icon].focused : ICON.hdpi[icon].unfocused}
      />
    );
  } else if (dpi === 2) {
    return (
      <TabIcon
        source={focused ? ICON.xhdpi[icon].focused : ICON.xhdpi[icon].unfocused}
      />
    );
  } else if (dpi === 3) {
    return (
      <TabIcon
        source={
          focused ? ICON.xxhdpi[icon].focused : ICON.xxhdpi[icon].unfocused
        }
      />
    );
  } else {
    return (
      <TabIcon
        source={
          focused ? ICON.xxxhdpi[icon].focused : ICON.xxxhdpi[icon].unfocused
        }
      />
    );
  }
};

export const ICON = {
  mdpi: {
    home: {
      focused: require("../assets/images/drawable-mdpi/home_focused.png"),
      unfocused: require("../assets/images/drawable-mdpi/home.png"),
    },
  },
  hdpi: {
    home: {
      focused: require("../assets/images/drawable-hdpi/home_focused.png"),
      unfocused: require("../assets/images/drawable-hdpi/home.png"),
    },
  },
  xhdpi: {
    home: {
      focused: require("../assets/images/drawable-xhdpi/home_focused.png"),
      unfocused: require("../assets/images/drawable-xhdpi/home.png"),
    },
  },
  xxhdpi: {
    home: {
      focused: require("../assets/images/drawable-xxhdpi/home_focused.png"),
      unfocused: require("../assets/images/drawable-xxhdpi/home.png"),
    },
  },
  xxxhdpi: {
    home: {
      focused: require("../assets/images/drawable-xxxhdpi/home_focused.png"),
      unfocused: require("../assets/images/drawable-xxxhdpi/home.png"),
    },
  },
};
