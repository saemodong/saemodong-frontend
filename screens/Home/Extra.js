import React, { useState } from "react";
import { FlatList, PixelRatio, Text, View } from "react-native";
import { useInfiniteQuery } from "react-query";
import { useIsFocused } from "@react-navigation/native";
import ActivityPreview from "../../components/ActiviyPreview";
import { activityApi } from "../../api";
import Sorter from "../../components/Sorter";
import Filter from "../../components//Filter";
import { ExtraSelected } from "../../ActivityConditions";

const dpi = PixelRatio.get();

const Extra = ({ navigation }) => {
  const [sorter, setSorter] = useState("latestAsc");
  const [filter, setFilter] = useState(ExtraSelected);
  const [conditions, setConditions] = useState({
    type: "",
    field: "",
    organizer: "",
    district: "",
  });
  const [loadAgain, setLoadAgain] = useState(false);

  const sortWith = (sort) => {
    setSorter(sort);
  };

  const filterWith = (filter) => {
    setFilter(filter);
  };

  const setConditionsWith = (conditions) => {
    setConditions(conditions);
  };

  const {
    isLoading: extraLoading,
    data: extraData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [
      "home",
      "extra",
      sorter,
      conditions.type,
      conditions.field,
      conditions.organizer,
      conditions.district,
    ],
    activityApi.extra,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.result.currentPage + 1;
        return nextPage > currentPage.result.totalPage - 1 ? null : nextPage;
      },
    }
  );
  const isFocused = useIsFocused();

  const updateData = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      await setLoadAgain(false);
    }
  };

  const updateLoad = (loadAgain) => {
    setLoadAgain(loadAgain);
  };

  if (loadAgain) {
    updateData();
  }
  // useEffect(() => {
  //   navigation.addListener("tabPress", () => {
  //     updateData();
  //   });
  // }, [navigation]);

  // const bottomTabNavigation = navigation.getParent();

  // useEffect(() => {
  //   bottomTabNavigation.addListener("tabPress", () => {
  //     if (isFocused) {
  //       setLoadAgain(true);
  //     }
  //   });
  // }, [bottomTabNavigation]);

  const headerComponent = (
    <View
      style={{
        flex: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: 16,
        borderBottomColor: "#0c111111",
        borderBottomWidth: 1,
      }}
    >
      <Filter
        isExtra={true}
        previousSelected={filter}
        setSelectedWith={filterWith}
        setConditionsWith={setConditionsWith}
      />
      <Sorter sorter={sorter} sortWith={sortWith} />
    </View>
  );

  const activityKeyExtractor = ({ item }) => `${item.id}`;
  const renderActivityPreview = ({ item }) => (
    <ActivityPreview
      id={item.id}
      name={item.name}
      openedAt={item.openedAt}
      closedAt={item.closedAt}
      type={item.type}
      field={item.field}
      marked={item.marked}
      url={item.url}
      updateLoad={updateLoad}
    />
  );

  const loadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  // TODO loading ????????? ???????????????
  return extraLoading ? null : extraData.pages === null ||
    typeof extraData.pages === "undefined" ? (
    <View>
      <Text>????????? ????????? ??? ????????????!</Text>
    </View>
  ) : (
    <FlatList
      ListHeaderComponent={headerComponent}
      data={extraData.pages.map((page) => page.result.pageResult).flat()}
      renderItem={renderActivityPreview}
      onEndReached={loadMore}
      extraData={loadAgain}
    />
  );
};

export default Extra;
