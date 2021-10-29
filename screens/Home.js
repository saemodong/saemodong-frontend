import React from "react";
import { View, Text, PixelRatio } from "react-native";

const Home = () => (
  <View>
    <Text>This is home</Text>
    <Text>{PixelRatio.get()}</Text>
  </View>
);

export default Home;
