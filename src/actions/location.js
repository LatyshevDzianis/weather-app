import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

function resolve(position) {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

function reject() {
  return {
    message: "Sorry, no position available.",
  };
}

const getUserLocation = () => {
  return (dispatch) => {
    dispatch(getUserLocationBegin());

    new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resolve, reject);
    })
      .then((res) => dispatch(getUserLocationSuccess(res)))
      .catch((err) => getUserLocationFailure(err));
  };
};

const getUserLocationBegin = () => {
  return {
    type: GET_USER_COORDS_BEGIN,
  };
};

const getUserLocationSuccess = (data) => {
  return {
    type: GET_USER_COORDS_SUCCESS,
    payload: data,
  };
};

const getUserLocationFailure = (err) => {
  return {
    type: GET_USER_COORDS_FAILURE,
    payload: err,
  };
};
