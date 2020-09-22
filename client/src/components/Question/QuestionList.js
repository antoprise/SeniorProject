import React, { Fragment } from "react";
import QuestionItem from "./QuestionItem";
import { Container } from "reactstrap";
import { css } from "glamor";
import ScrollToBottom from "react-scroll-to-bottom";

const QuestionList = (props) => {
  const { room, questionList } = props;
  const ROOT_CSS = css({
    height: 460,
  });
  return (
    <Fragment>
      <div>
        <Container className="question-boxlist question-box pt-2 text-center">
          <p className="feedback-room text-break">ROOM {room.roomName}</p>
          <div className="">
            <ScrollToBottom className={ROOT_CSS}>
              {Array.isArray(questionList)}
              {questionList.map((question) => (
                <QuestionItem
                  key={question._id}
                  question={question}
                  room={room}
                />
              ))}
            </ScrollToBottom>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default QuestionList;
