import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  country: "",
  city: "",
};

const position = (state = initialState, action) => {
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
        country: action.payload.country,
        city: action.payload.city,
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

export default position;
