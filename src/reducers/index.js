import { combineReducers } from "redux";
import position from "./position";

const rootReducer = combineReducers({
  position: position,
});

export default rootReducer;
