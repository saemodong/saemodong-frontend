import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, FlatList } from "react-native";
import { useQeury, useInfiniteQuery } from "react-query";

import { bookmarkApi } from "../../api";
import ActivityPreview from "../../components/ActiviyPreview";

const Bookmark = ({ navigation }) => {
  const { isLoading, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(["bookmark", "activity"], bookmarkApi.getBookmark, {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.result.currentPage + 1;
        return nextPage > currentPage.result.totalPage - 1 ? null : nextPage;
      },
    });

  const [loadAgain, setLoadAgain] = useState(false);
  const updateData = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setLoadAgain(false);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", updateData);
  }, [navigation]);
  if (loadAgain) {
    updateData();
  }
  const updateLoad = (loadAgain) => {
    setLoadAgain(loadAgain);
  };
  const activityKeyExtractor = ({ item }) => `${item.id}`;
  const renderActivityPreview = ({ item }) =>
    isLoading ? (
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

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return isLoading ? null : data.pages === null ||
    typeof data.pages == "undefined" ? (
    <View>
      <Text>공고를 불러올 수 없습니다!</Text>
    </View>
  ) : (
    <FlatList
      data={data.pages.map((page) => page.result.pageResult).flat()}
      renderItem={renderActivityPreview}
      onEndReached={loadMore}
      extraData={loadAgain}
    />
  );
};

export default Bookmark;
