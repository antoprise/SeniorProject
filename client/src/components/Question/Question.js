import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRoomById, roomUnload } from "../../actions/roomActions";
import {
  getUserQuestionList,
  questionListUnload,
} from "../../actions/questionAction";
import QuestionList from "./QuestionList";
import { Container } from "reactstrap";
import Loading from "../Loading/Loading";

const Question = (props) => {
  const {
    getRoomById,
    roomUnload,
    getUserQuestionList,
    questionListUnload,
    room: { room, roomLoading },
    question: { questionList, questionLoading },
    match,
  } = props;

  useEffect(() => {
    getRoomById(match.params.roomid);
    return () => {
      roomUnload();
    };
  }, [getRoomById, match.params.roomid, roomUnload]);

  useEffect(() => {
    getUserQuestionList(match.params.roomid);
    return () => {
      questionListUnload();
    };
  }, [getUserQuestionList, match.params.roomid, questionListUnload]);

  return roomLoading || questionLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container fluid className="topic">
          <h1>Q&A</h1>
        </Container>
        <Container>
          <div>{<QuestionList questionList={questionList} room={room} />}</div>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  room: state.room,
  question: state.question,
});

export default connect(mapStateToProps, {
  getRoomById,
  roomUnload,
  getUserQuestionList,
  questionListUnload,
})(Question);
