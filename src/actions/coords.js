import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

const resolve = (position) => {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
};

const reject = () => {
  return {
    message: "Sorry, no position available.",
  };
};

export const getUserCoords = () => (dispatch) => {
  dispatch(getUserCoordsBegin());

  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(resolve, reject);
  })
    .then((res) => dispatch(getUserCoordsSuccess(res)))
    .catch((err) => getUserCoordsFailure(err));
};

const getUserCoordsBegin = () => {
  return {
    type: GET_USER_COORDS_BEGIN,
  };
};

const getUserCoordsSuccess = (data) => {
  return {
    type: GET_USER_COORDS_SUCCESS,
    payload: data,
  };
};

const getUserCoordsFailure = (err) => {
  return {
    type: GET_USER_COORDS_FAILURE,
    payload: err,
  };
};
