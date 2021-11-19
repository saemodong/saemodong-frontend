import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../components/Profile";

const Stack = createNativeStackNavigator();

const RegisterStack = ({ keyValidator }) => {
  const ProfileComponent = () => <Profile keyValidator={keyValidator} />;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 56,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="RegisterStack"
        options={{
          title: "프로필 설정",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: "AppleSDGothicNeo-Bold",
          },
        }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};
export default RegisterStack;
