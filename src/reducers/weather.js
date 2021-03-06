import {
  FETCH_OPEN_WEATHER_BEGIN,
  FETCH_OPEN_WEATHER_SUCCESS,
  FETCH_OPEN_WEATHER_FAILURE,
  FETCH_WEATHER_API_BEGIN,
  FETCH_WEATHER_API_SUCCESS,
  FETCH_WEATHER_API_FAILURE,
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
  icon: null,
};

const weather = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPEN_WEATHER_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_WEATHER_API_BEGIN: {
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
        icon: action.payload.weather[0].icon,
        api: "OpenWeather",
      };
    }
    case FETCH_WEATHER_API_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        temperature: action.payload.current.temp_f,
        weather: action.payload.current.condition.text,
        pressure: action.payload.current.pressure_mb,
        humidity: action.payload.current.humidity,
        windSpeed: action.payload.current.wind_mph,
        city: action.payload.location.name,
        country: action.payload.location.country,
        icon: action.payload.current.condition.icon,
        api: "WeatherApi",
      };
    }
    case FETCH_OPEN_WEATHER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case FETCH_WEATHER_API_FAILURE: {
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
