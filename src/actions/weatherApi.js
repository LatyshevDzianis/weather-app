import qs from "query-string";

import {
  FETCH_WEATHER_API_BEGIN,
  FETCH_WEATHER_API_SUCCESS,
  FETCH_WEATHER_API_FAILURE,
} from "../constants/actionTypes";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../constants/api";
import { getUserCoords } from "./coords";

export const fetchWeatherApiByCity = (params) => async (dispatch) => {
  try {
    dispatch(fetchWeatherApiBegin());
    const res = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&${qs.stringify(params)}`
    );

    const json = await res.json();

    if (json.error) {
      throw new Error("City not found");
    }

    dispatch(fetchWeatherApiSuccess(json));
  } catch (err) {
    dispatch(fetchWeatherApiFailure(err.message));
  }
};

export const fetchWeatherApiByCoords = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(getUserCoords());
    dispatch(fetchWeatherApiBegin());
    const res = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${payload.coords.latitude},${payload.coords.longitude}`
    );
    const json = await res.json();
    dispatch(fetchWeatherApiSuccess(json));
  } catch (err) {
    dispatch(fetchWeatherApiFailure(err.toString()));
  }
};

const fetchWeatherApiBegin = () => {
  return {
    type: FETCH_WEATHER_API_BEGIN,
  };
};

const fetchWeatherApiSuccess = (data) => {
  return {
    type: FETCH_WEATHER_API_SUCCESS,
    payload: data,
  };
};

const fetchWeatherApiFailure = (err) => {
  return {
    type: FETCH_WEATHER_API_FAILURE,
    payload: err,
  };
};
