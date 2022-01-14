import React from "react";
import { PixelRatio, Image } from "react-native";
import styled from "styled-components/native";

import { IMAGES } from "./Images";

const TabIcon = styled.Image`
  width: 60px;
  height: 41px;
`;

export const getIcon = (dpi, icon) => {
  let SOURCE;

  if (dpi >= 1 && dpi < 1.5) {
    SOURCE = IMAGES.mdpi[icon];
  } else if (dpi >= 1.5 && dpi < 2) {
    SOURCE = IMAGES.hdpi[icon];
  } else if (dpi >= 2 && dpi < 3) {
    SOURCE = IMAGES.xhdpi[icon];
  } else if (dpi >= 3 && dpi < 4) {
    SOURCE = IMAGES.xxhdpi[icon];
  } else {
    SOURCE = IMAGES.xxxhdpi[icon];
  }

  return SOURCE;
};

export const getTabIcon = (dpi, focused, icon) => {
  const bottomTabIcon = `bottomtab_${icon}`;
  if (dpi >= 1 && dpi < 1.5) {
    return (
      <TabIcon
        source={
          focused
            ? IMAGES.mdpi[bottomTabIcon].focused
            : IMAGES.mdpi[bottomTabIcon].unfocused
        }
      />
    );
  } else if (dpi >= 1.5 && dpi < 2) {
    return (
      <TabIcon
        source={
          focused
            ? IMAGES.hdpi[bottomTabIcon].focused
            : IMAGES.hdpi[bottomTabIcon].unfocused
        }
      />
    );
  } else if (dpi >= 2 && dpi < 3) {
    return (
      <TabIcon
        source={
          focused
            ? IMAGES.xhdpi[bottomTabIcon].focused
            : IMAGES.xhdpi[bottomTabIcon].unfocused
        }
      />
    );
  } else if (dpi >= 3 && dpi < 4) {
    return (
      <TabIcon
        source={
          focused
            ? IMAGES.xxhdpi[bottomTabIcon].focused
            : IMAGES.xxhdpi[bottomTabIcon].unfocused
        }
      />
    );
  } else {
    return (
      <TabIcon
        source={
          focused
            ? IMAGES.xxxhdpi[bottomTabIcon].focused
            : IMAGES.xxxhdpi[bottomTabIcon].unfocused
        }
      />
    );
  }
};
