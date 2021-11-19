import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  PixelRatio,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useQeury, useInfiniteQuery } from "react-query";
import { useIsFocused } from "@react-navigation/native";

import { getIcon } from "../../helpers/Icons";
import ActivityPreview from "../../components/ActiviyPreview";
import { activityApi } from "../../api";
import Sorter from "../../components/Sorter";

const dpi = PixelRatio.get();

const Main = ({ navigation }) => {
  const [isToday, setIsToday] = useState("N");
  const [sorter, setSorter] = useState("latestAsc");
  const [loadAgain, setLoadAgain] = useState(false);

  const sortWith = (sort) => {
    setSorter(sort);
  };

  const filter = () => {
    setIsToday(isToday === "N" ? "Y" : "N");
  };

  const {
    isLoading: mainLoading,
    data: mainData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(["home", "main", isToday, sorter], activityApi.main, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.result.currentPage + 1;
      return nextPage > currentPage.result.totalPage - 1 ? null : nextPage;
    },
  });
  const isFocused = useIsFocused();

  const updateData = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setLoadAgain(false);
    }
  };

  const updateLoad = (loadAgain) => {
    setLoadAgain(loadAgain);
  };

  if (loadAgain) {
    updateData();
  }

  useEffect(() => {
    navigation.addListener("tabPress", updateData);
  }, [navigation]);

  const bottomTabNavigation = navigation.getParent();

  useEffect(() => {
    bottomTabNavigation.addListener("tabPress", () => {
      if (isFocused) {
        setLoadAgain(true);
      }
    });
  }, [bottomTabNavigation]);

  const headerComponent = (
    <View
      style={{
        flex: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 16,
        borderBottomColor: "#0c111111",
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={filter}
        activeOpacity={0.6}
      >
        <Image
          style={{ width: 21, height: 21, marginTop: 3 }}
          source={
            isToday === "Y"
              ? getIcon(dpi, "registered_tdy_focused")
              : getIcon(dpi, "registered_tdy")
          }
        />
        <Text
          style={{
            color: isToday === "Y" ? "#111111" : "#93929b",
            fontFamily: "AppleSDGothicNeo-Medium",
            fontSize: 15,
            marginLeft: 4,
            lineHeight: 20,
          }}
        >
          오늘 등록된 공고만 보기
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Sorter sorter={sorter} sortWith={sortWith} />
      </View>
    </View>
  );

  const activityKeyExtractor = ({ item }) => `${item.id}`;
  const renderActivityPreview = ({ item }) => {
    return mainLoading ? (
      <View>
        <Text>Loading...</Text>
      </View>
    ) : (
      <ActivityPreview
        id={item.id}
        name={item.name}
        openedAt={item.openedAt}
        closedAt={item.closedAt}
        type={item.type}
        marked={item.marked}
        url={item.url}
        updateLoad={updateLoad}
      />
    );
  };
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // TODO loading 예쁘게 만들어주기
  return mainLoading ? null : mainData.pages === null ||
    typeof mainData.pages === "undefined" ? (
    <View>
      <Text>공고를 불러올 수 없습니다!</Text>
    </View>
  ) : (
    <FlatList
      ListHeaderComponent={headerComponent}
      data={mainData.pages.map((page) => page.result.pageResult).flat()}
      renderItem={renderActivityPreview}
      onEndReached={loadMore}
      extraData={loadAgain}
    />
  );
};

export default Main;
