import React from "react";
import { View, Image, TouchableOpacity, PixelRatio } from "react-native";

import { getIcon } from "../helpers/Icons";

const dpi = PixelRatio.get();

const Bookmark = ({ marked }) => (
  <TouchableOpacity activeOpacity={0.6}>
    {marked ? (
      <Image
        style={{ width: 24, height: 24 }}
        source={getIcon(dpi, "bookmark_marked")}
      />
    ) : (
      <Image
        style={{ width: 24, height: 24 }}
        source={getIcon(dpi, "bookmark_unmarked")}
      />
    )}
  </TouchableOpacity>
);

export default Bookmark;
