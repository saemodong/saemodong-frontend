import React from "react";

import { SERVER_URL } from "@env";
import { getValue } from "./helpers/Storage";

const BASE_URL = `${SERVER_URL}`;

export const activityApi = {
  main: async ({ pageParam = 0, queryKey }) => {
    const isToday = queryKey[2];
    const sorter = queryKey[3];
    const API_KEY = await getValue("apiKey");
    return fetch(
      `${BASE_URL}/activity?apiKey=${API_KEY}&page=${pageParam}&sorter=${sorter}&isToday=${isToday}`
    ).then((res) => res.json());
  },
  extra: async ({ pageParam = 0, queryKey }) => {
    const [key_0, key_1, sorter, type, field, organizer, district] = queryKey;
    const API_KEY = await getValue("apiKey");

    return fetch(
      `${BASE_URL}/activity/extra?apiKey=${API_KEY}&page=${pageParam}&sorter=${sorter}&type=${encodeURIComponent(
        type
      )}&field=${encodeURIComponent(field)}&organizer=${encodeURIComponent(
        organizer
      )}&district=${encodeURIComponent(district)}`
    ).then((res) => res.json());
  },
  contest: async ({ pageParam = 0, queryKey }) => {
    const [key_0, key_1, sorter, type, field, organizer, prize] = queryKey;
    const API_KEY = await getValue("apiKey");
    return fetch(
      `${BASE_URL}/activity/contest?apiKey=${API_KEY}&page=${pageParam}&sorter=${sorter}&type=${encodeURIComponent(
        type
      )}&field=${encodeURIComponent(field)}&organizer=${encodeURIComponent(
        organizer
      )}&prize=${encodeURIComponent(prize)}`
    ).then((res) => res.json());
  },
  mark: async (activityId) => {
    const API_KEY = await getValue("apiKey");
    return fetch(`${BASE_URL}/activity/${activityId}/mark?apiKey=${API_KEY}`);
  },
  unmark: async (activityId) => {
    const API_KEY = await getValue("apiKey");
    return fetch(`${BASE_URL}/activity/${activityId}/unmark?apiKey=${API_KEY}`);
  },
};

export const userApi = {
  login: (apiKey) => fetch(`${BASE_URL}/user/login?apiKey=${apiKey}`),
  register: (nickname) =>
    fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(nickname),
    }),
  getExtraInterest: async () => {
    const API_KEY = await getValue("apiKey");
    return fetch(`${BASE_URL}/user/interest/extra?apiKey=${API_KEY}`);
  },
  getContestInterest: async () => {
    const API_KEY = await getValue("apiKey");
    return fetch(`${BASE_URL}/user/interest/contest?apiKey=${API_KEY}`);
  },
  setExtraInterest: async (extraInterest) => {
    const API_KEY = await getValue("apiKey");
    console.log(`${BASE_URL}/user/interest/extra/${API_KEY}`);
    return fetch(`${BASE_URL}/user/interest/extra/${API_KEY}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(extraInterest),
    });
  },
};

export const bookmarkApi = {
  getBookmark: async ({ pageParam = 0 }) => {
    const API_KEY = await getValue("apiKey");

    return fetch(
      `${BASE_URL}/bookmark?apiKey=${API_KEY}&page=${pageParam}&type=activity`
    ).then((res) => res.json());
  },
};
