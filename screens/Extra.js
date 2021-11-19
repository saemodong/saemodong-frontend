import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ActivityConditions } from "../ActivityConditions";
import FilterItem from "../components/FilterItem";

const Extra = ({ filter, filterWith }) => {
  return (
    <FilterItem
      title="활동유형"
      activityType="extra"
      category="type"
      filter={filter}
      filterWith={filterWith}
    />
  );
};

export default Extra;
