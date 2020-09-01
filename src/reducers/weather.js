import {
  FETCH_OPEN_WEATHER_BEGIN,
  FETCH_OPEN_WEATHER_SUCCESS,
  FETCH_OPEN_WEATHER_FAILURE,
  FETCH_WEATHER_STACK_BEGIN,
  FETCH_WEATHER_STACK_SUCCESS,
  FETCH_WEATHER_STACK_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  city: null,
  country: null,
  info: null,
  temperature: null,
  weather: null,
  description: null,
  pressure: null,
  humidity: null,
  windSpeed: null,
};

const weather = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPEN_WEATHER_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_WEATHER_STACK_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_OPEN_WEATHER_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        temperature: action.payload.main.temp,
        weather: action.payload.weather[0].main,
        description: action.payload.weather[0].description,
        pressure: action.payload.main.pressure,
        humidity: action.payload.main.humidity,
        windSpeed: action.payload.wind.speed,
        sunrise: action.payload.sys.sunrise,
        sunset: action.payload.sys.sunset,
        city: action.payload.name,
        country: action.payload.sys.country,
      };
    }
    case FETCH_WEATHER_STACK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        temperature: action.payload.current.temperature,
        weather: action.payload.current.weather_descriptions[0],
        pressure: action.payload.current.pressure,
        humidity: action.payload.current.humidity,
        windSpeed: action.payload.current.wind_speed,
        city: action.payload.location.name,
        country: action.payload.location.country,
      };
    }
    case FETCH_OPEN_WEATHER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case FETCH_WEATHER_STACK_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default weather;
