import React from "react";
import ActivityConditionItem from "./ActivityConditionItem";

const ActivityCondition = ({ isExtra, previousSelected, setSelectedWith }) =>
  isExtra ? (
    <>
      <ActivityConditionItem
        title="활동유형"
        activityType="extra"
        category="type"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="활동분야"
        activityType="extra"
        category="field"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="주최사"
        activityType="extra"
        category="organizer"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="지역"
        activityType="extra"
        category="district"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
    </>
  ) : (
    <>
      <ActivityConditionItem
        title="공모분야"
        activityType="contest"
        category="type"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="공모주제"
        activityType="contest"
        category="field"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="주최사"
        activityType="contest"
        category="organizer"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
      <ActivityConditionItem
        title="시상내용"
        activityType="contest"
        category="prize"
        previousSelected={previousSelected}
        setSelectedWith={setSelectedWith}
      />
    </>
  );

export default ActivityCondition;
