import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  latitude: 0,
  longitude: 0,
};

const coords = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COORDS_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_COORDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude,
      };
    }
    case GET_USER_COORDS_FAILURE: {
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

export default coords;
