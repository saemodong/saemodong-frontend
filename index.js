import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

import App from "./App";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("message handled in background!");
});

AppRegistry.registerComponent("app", () => App);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
