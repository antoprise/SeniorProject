import { combineReducers } from "redux";
import ask from "./askReducer";
import room from "./roomReducer";
import orgAsk from "./orgAskReducer";
import orgRoom from "./orgRoomReducer";
import orgFeedback from "./orgFeedbackReducer";
import auth from "./authReducer";
import alert from "./alertReducer";

export default combineReducers({
  ask,
  room,
  orgAsk,
  orgRoom,
  orgFeedback,
  auth,
  alert
});
