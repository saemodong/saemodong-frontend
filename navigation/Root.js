import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./Tabs";
import Stacks from "./Stacks";

const RootStack = createNativeStackNavigator();

const Root = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="Tabs" component={Tabs} />
    <RootStack.Screen name="Stacks" component={Stacks} />
  </RootStack.Navigator>
);

export default Root;
