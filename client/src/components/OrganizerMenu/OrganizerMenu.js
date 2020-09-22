import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getOrgRoomById,
  editAskStatus,
  orgRoomUnload,
  editFeedbackStatus,
} from "../../actions/orgRoomActions";
import { Container, Row, Col, Button } from "reactstrap";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import ask from "../../assets/ask.svg";
import question from "../../assets/question.svg";
import feedback from "../../assets/feedback.svg";

const OrganizerMenu = (props) => {
  const {
    getOrgRoomById,
    orgRoomUnload,
    editAskStatus,
    editFeedbackStatus,
    orgRoom: { room, roomLoading },
    match,
  } = props;

  useEffect(() => {
    console.log(match.params.roomid);
    getOrgRoomById(match.params.roomid);
    return () => {
      orgRoomUnload();
    };
  }, [getOrgRoomById, match.params.roomid, orgRoomUnload]);

  console.log(roomLoading);
  console.log(room);
  return room == null || roomLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container className="orgmenu-room">
          <p>ROOM : {room.roomName}</p>
          <p>PIN : {room.code}</p>
        </Container>
        <Container>
          <Row className="orgmenu-row">
            <Col className="my-4">
              <Link to={`/organizer/${room._id}/ask`}>
                <Button
                  className="orgmenu-box"
                  size="lg"
                  style={{
                    backgroundColor: "#EEBBC3",
                    borderColor: "#121629",
                    borderWidth: "2px",
                    color: "#232946",
                  }}
                >
                  <p className="orgmenu-text">ASK</p>
                  <img src={ask} width="64px" height="64px"></img>
                </Button>
              </Link>

              <Col className="text-center mt-2">
                <div className="custom-control custom-switch text-center ">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="controlAskSwitch"
                    checked={room.askStatus}
                    onChange={() => editAskStatus(room._id)}
                  />

                  <label
                    className="custom-control-label anonymous"
                    htmlFor="controlAskSwitch"
                  >
                    ON-OFF FUNCTION
                  </label>
                </div>
              </Col>
              <Col className="text-center mt-5 ">
                <Link to={`/organizer/${room._id}/ask/present`}>
                  <Button
                    className="org-btn"
                    style={{
                      backgroundColor: "#FF8BA7",
                      borderColor: "#121629",
                      borderWidth: "2px",
                      color: "#232946",
                    }}
                  >
                    Presentation
                  </Button>
                </Link>
              </Col>
            </Col>
            <Col className="my-4">
              <Link to={`/organizer/${room._id}/question`}>
                <Button
                  className="orgmenu-box"
                  size="lg"
                  style={{
                    backgroundColor: "#EEBBC3",
                    borderColor: "#121629",
                    borderWidth: "2px",
                    color: "#232946",
                  }}
                >
                  <p className="orgmenu-text">Q&A</p>
                  <img src={question} width="64px" height="64px"></img>
                </Button>
              </Link>
            </Col>

            <Col className="my-4">
              <Link to={`/organizer/${room._id}/feedback`}>
                <Button
                  className="orgmenu-box"
                  size="lg"
                  style={{
                    backgroundColor: "#EEBBC3",
                    borderColor: "#121629",
                    borderWidth: "2px",
                    color: "#232946",
                  }}
                >
                  <p className="orgmenu-text">FEEDBACK</p>
                  <img src={feedback} width="64px" height="64px"></img>
                </Button>
              </Link>
              <Col className="text-center mt-2">
                <div className="custom-control custom-switch text-center ">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="controlFeedbackSwitch"
                    checked={room.feedbackStatus}
                    onChange={() => editFeedbackStatus(room._id)}
                  />

                  <label
                    className="custom-control-label anonymous"
                    htmlFor="controlFeedbackSwitch"
                  >
                    ON-OFF FUNCTION
                  </label>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orgRoom: state.orgRoom,
});

export default connect(mapStateToProps, {
  getOrgRoomById,
  editAskStatus,
  orgRoomUnload,
  editFeedbackStatus,
})(OrganizerMenu);
