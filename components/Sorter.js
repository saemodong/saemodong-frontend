import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio,
  Dimensions,
} from "react-native";

import { getIcon } from "../helpers/Icons";

const dpi = PixelRatio.get();
const SCREEN_WIDTH = Dimensions.get("window").width;

const Sorter = ({ sorter, sortWith }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectSorter = (selected) => {
    closeModal();
    sortWith(selected);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 20,
        }}
        activeOpacity={0.6}
        onPress={toggleModal}
      >
        <Image
          style={{ width: 21, height: 21, marginTop: 3 }}
          source={getIcon(dpi, "sorter")}
        />
        <Text
          style={{
            color: "#111111",
            fontFamily: "AppleSDGothicNeo-Medium",
            fontSize: 15,
            marginLeft: 4,
            lineHeight: 20,
          }}
        >
          {sorter === "latestAsc" ? "최신순" : "마감임박순"}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        backdropColor="#000000"
        backdropOpacity={0.8}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            height: 113,
            width: SCREEN_WIDTH,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => selectSorter("latestAsc")}
          >
            <View
              style={{
                height: 56,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {sorter === "latestAsc" ? (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                  }}
                  source={getIcon(dpi, "check")}
                />
              ) : null}
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "AppleSDGothicNeo-SemiBold",
                }}
              >
                최신순
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }}
          ></View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => selectSorter("ddayAsc")}
          >
            <View
              style={{
                height: 56,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {sorter === "ddayAsc" ? (
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                  }}
                  source={getIcon(dpi, "check")}
                />
              ) : null}
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "AppleSDGothicNeo-SemiBold",
                }}
              >
                마감임박순
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};
export default Sorter;
