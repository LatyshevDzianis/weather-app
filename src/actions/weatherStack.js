import qs from "query-string";

import {
  FETCH_WEATHER_STACK_BEGIN,
  FETCH_WEATHER_STACK_SUCCESS,
  FETCH_WEATHER_STACK_FAILURE,
} from "../constants/actionTypes";
import { WEATHER_STACK_URL, WEATHER_STACK_API_KEY } from "../constants/api";
import { getUserCoords } from "./coords";

export const fetchWeatherStackByCity = (params) => async (dispatch) => {
  try {
    dispatch(fetchWeatherStackBegin());
    const res = await fetch(
      `${WEATHER_STACK_URL}?${qs.stringify(
        params
      )}&access_key=${WEATHER_STACK_API_KEY}`
    );
    const json = await res.json();
    console.log(json);
    dispatch(fetchWeatherStackSuccess(json));
  } catch (err) {
    console.log("Error here", err);
    dispatch(fetchWeatherStackFailure(err));
  }
};

export const fetchWeatherStackByCoords = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(getUserCoords());
    dispatch(fetchWeatherStackBegin());
    const res = await fetch(
      `${WEATHER_STACK_URL}?query=${payload.coords.latitude},${payload.coords.longitude}&access_key=${WEATHER_STACK_API_KEY}`
    );
    const json = await res.json();
    dispatch(fetchWeatherStackSuccess(json));
  } catch (err) {
    dispatch(fetchWeatherStackFailure(err.toString()));
  }
};

const fetchWeatherStackBegin = () => {
  return {
    type: FETCH_WEATHER_STACK_BEGIN,
  };
};

const fetchWeatherStackSuccess = (data) => {
  return {
    type: FETCH_WEATHER_STACK_SUCCESS,
    payload: data,
  };
};

const fetchWeatherStackFailure = (err) => {
  return {
    type: FETCH_WEATHER_STACK_FAILURE,
    payload: err,
  };
};
