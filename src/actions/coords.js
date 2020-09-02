import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

export const getUserCoords = () => (dispatch) => {
  dispatch(getUserCoordsBegin());

  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(resolve, reject);
  })
    .then((res) => dispatch(getUserCoordsSuccess(res)))
    .catch((err) => dispatch(getUserCoordsFailure(err)));
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
