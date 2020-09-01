import { combineReducers } from "redux";
import coords from "./coords";
import weather from "./weather";

const rootReducer = combineReducers({
  coords,
  weather,
});

export default rootReducer;
