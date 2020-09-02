import {
  FETCH_OPEN_WEATHER_BEGIN,
  FETCH_OPEN_WEATHER_SUCCESS,
  FETCH_OPEN_WEATHER_FAILURE,
} from "../constants/actionTypes";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from "../constants/api";
import { getUserCoords } from "./coords";
import qs from "query-string";

export const fetchOpenWeatherByCity = (params) => async (dispatch) => {
  try {
    dispatch(fetchOpenWeatherBegin());
    const res = await fetch(
      `${OPEN_WEATHER_URL}?${qs.stringify(
        params
      )}&appid=${OPEN_WEATHER_API_KEY}`
    );

    if (res.status > 400) {
      throw new Error("City not found");
    }

    const json = await res.json();
    dispatch(fetchOpenWeatherSuccess(json));
  } catch (err) {
    dispatch(fetchOpenWeatherFailure(err.message));
  }
};

export const fetchOpenWeatherByCoords = () => async (dispatch) => {
  try {
    const { payload } = await dispatch(getUserCoords());

    if (payload.code === 1) {
      throw new Error("We don't have your location");
    }

    dispatch(fetchOpenWeatherBegin());
    const res = await fetch(
      `${OPEN_WEATHER_URL}?lat=${payload.coords.latitude}&lon=${payload.coords.longitude}&appid=${OPEN_WEATHER_API_KEY}`
    );
    const json = await res.json();
    dispatch(fetchOpenWeatherSuccess(json));
  } catch (err) {
    dispatch(fetchOpenWeatherFailure(err.message));
  }
};

const fetchOpenWeatherBegin = () => {
  return {
    type: FETCH_OPEN_WEATHER_BEGIN,
  };
};

const fetchOpenWeatherSuccess = (data) => {
  return {
    type: FETCH_OPEN_WEATHER_SUCCESS,
    payload: data,
  };
};

const fetchOpenWeatherFailure = (err) => {
  return {
    type: FETCH_OPEN_WEATHER_FAILURE,
    payload: err,
  };
};
