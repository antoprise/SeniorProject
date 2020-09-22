import { combineReducers } from "redux";
import ask from "./askReducer";
import room from "./roomReducer";
import question from "./questionReducer";
import feedback from "./feedbackReducer";
import orgAsk from "./orgAskReducer";
import orgRoom from "./orgRoomReducer";
import orgFeedback from "./orgFeedbackReducer";
import orgQuestion from "./orgQuestionReducer";
import orgAnswer from "./orgAnswerReducer";
import auth from "./authReducer";
import alert from "./alertReducer";

export default combineReducers({
  ask,
  room,
  question,
  feedback,
  orgAsk,
  orgRoom,
  orgFeedback,
  orgQuestion,
  orgAnswer,
  auth,
  alert,
});
