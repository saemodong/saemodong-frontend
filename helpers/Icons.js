import React from "react";
import { PixelRatio, Image } from "react-native";
import styled from "styled-components/native";

import { IMAGES } from "./Images";

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
