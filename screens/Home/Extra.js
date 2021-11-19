import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  PixelRatio,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQeury, useInfiniteQuery } from "react-query";
import { useIsFocused } from "@react-navigation/native";

import { getIcon } from "../../helpers/Icons";
import ActivityPreview from "../../components/ActiviyPreview";
import { activityApi } from "../../api";
import Sorter from "../../components/Sorter";
import Filter from "../../components//Filter";

const dpi = PixelRatio.get();

const Extra = ({ navigation }) => {
  const [sorter, setSorter] = useState("latestAsc");
  const [filter, setFilter] = useState({
    type: { btn_0: false, btn_1: false, btn_2: false, btn_3: false },
    field: {
      btn_0: false,
      btn_1: false,
      btn_2: false,
      btn_3: false,
      btn_4: false,
      btn_5: false,
      btn_6: false,
      btn_7: false,
      btn_8: false,
      btn_9: false,
      btn_10: false,
      btn_11: false,
      btn_12: false,
      btn_13: false,
      btn_14: false,
    },
    organizer: {
      btn_0: false,
      btn_1: false,
      btn_2: false,
      btn_3: false,
      btn_4: false,
      btn_5: false,
      btn_6: false,
      btn_7: false,
      btn_8: false,
    },
    district: {
      btn_0: false,
      btn_1: false,
      btn_2: false,
      btn_3: false,
      btn_4: false,
      btn_5: false,
      btn_6: false,
      btn_7: false,
      btn_8: false,
      btn_9: false,
      btn_10: false,
      btn_11: false,
      btn_12: false,
      btn_13: false,
      btn_14: false,
      btn_15: false,
      btn_16: false,
      btn_17: false,
      btn_18: false,
    },
  });
  const [conditions, setConditions] = useState({
    type: "",
    field: "",
    organizer: "",
    district: "",
  });
  const [isFiltered, setIsFiltered] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);

  const sortWith = (sort) => {
    setSorter(sort);
  };

  const filterWith = (filter) => {
    setFilter(filter);
  };

  const filtered = (isFiltered) => {
    setIsFiltered(isFiltered);
  };

  const conditionsWith = (conditions) => {
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
        justifyContent: "flex-end",
        paddingLeft: 16,
        borderBottomColor: "#0c111111",
        borderBottomWidth: 1,
      }}
    >
      <Filter
        isExtra={true}
        filter={filter}
        filterWith={filterWith}
        filtered={filtered}
        conditionsWith={conditionsWith}
      />
      <Sorter sorter={sorter} sortWith={sortWith} />
    </View>
  );

  const activityKeyExtractor = ({ item }) => `${item.id}`;
  const renderActivityPreview = ({ item }) =>
    extraLoading ? (
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

  // TODO loading 예쁘게 만들어주기
  return extraLoading ? null : extraData.pages === null ||
    typeof extraData.pages == "undefined" ? (
    <View>
      <Text>공고를 불러올 수 없습니다!</Text>
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
