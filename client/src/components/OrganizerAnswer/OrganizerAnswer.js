import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getOrgRoomById, orgRoomUnload } from "../../actions/orgRoomActions";
import {
  getOrgAnswerList,
  orgAnswerListUnload,
} from "../../actions/orgAnswerActions";
import {
  getOrgQuestionById,
  orgQuestionUnload,
} from "../../actions/orgQuestionActions";
import OrganizerAnswerList from "./OrganizerAnswerList";
import OrganizerAnswerAnalyze from "./OrganizerAnswerAnalyze";
import Loading from "../Loading/Loading";
import { Container, Row, Col, Button, Card } from "reactstrap";
import apiUrl from '../../utils/apiUrl' ;
import io from "socket.io-client";

const OrganizerAnswer = (props) => {
  const {
    getOrgRoomById,
    orgRoomUnload,
    getOrgQuestionById,
    orgQuestionUnload,
    getOrgAnswerList,
    orgAnswerListUnload,
    orgRoom: { room, roomLoading },
    orgAnswer: { answer, answerList, answerLoading },
    orgQuestion: { question, questionLoading },
    match,
  } = props;
  
  useEffect(() => {
    getOrgRoomById(match.params.roomid);
    return () => {
      orgRoomUnload();
    };
  }, [getOrgRoomById, match.params.roomid, orgRoomUnload]);

  useEffect(() => {
    getOrgQuestionById(match.params.questionid);
    return () => {
      orgQuestionUnload();
    };
  }, [getOrgQuestionById, match.params.questionid, orgQuestionUnload]);

  useEffect(() => {
    let socket = io.connect(apiUrl);

    socket.emit("room", match.params.roomid);

    socket.on("organizerAnswer", (data) => {
      if (data.status === 200) {
        getOrgAnswerList(match.params.questionid);
      }
    });

    getOrgAnswerList(match.params.questionid);

    return () => {
      orgAnswerListUnload();
      socket.disconnect();
    };
  }, [getOrgAnswerList, match.params.questionid, orgAnswerListUnload]);

  console.log(room);
  console.log(answerList);

  return roomLoading || questionLoading || answerLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container fluid>
          <h1 className="org-h2 text-center text-break org-section">
            Question: {question.questionDetail}
          </h1>
        </Container>
        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col md="5" xs="12" className="mt-4">
              <h5 className="org-h5 text-break">
                ROOM: {room.roomName}
                <br />
                PIN: {room.code}
                <br />
              </h5>

              {<OrganizerAnswerList answerList={answerList} answer={answer} />}
            </Col>

            <Col md="5" xs="12" className="mt-4">
              {<OrganizerAnswerAnalyze answerList={answerList} />}
              <Row>
                <Col md="12" xs="12" className="text-center mt-5">
                  <Button
                    className="org-btn"
                    style={{
                      backgroundColor: "#FF8BA7",
                      borderColor: "#121629",
                      borderWidth: "2px",
                      color: "#232946",
                    }}
                  >
                    Export
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orgRoom: state.orgRoom,
  orgAnswer: state.orgAnswer,
  orgQuestion: state.orgQuestion,
});

export default connect(mapStateToProps, {
  getOrgRoomById,
  getOrgQuestionById,
  orgQuestionUnload,
  getOrgAnswerList,
  orgRoomUnload,
  orgAnswerListUnload,
})(OrganizerAnswer);
