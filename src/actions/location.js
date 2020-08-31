import {
  GET_USER_COORDS_BEGIN,
  GET_USER_COORDS_SUCCESS,
  GET_USER_COORDS_FAILURE,
} from "../constants/actionTypes";

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

function success(position) {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

function error() {
  return {
    message: "Sorry, no position available."
  }
}

const getUserLocation = () => {
  return async (dispatch) => {
    dispatch(getUserLocationBegin());

    const payload = await navigator.geolocation.watchPosition(success, error, options);
    
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
