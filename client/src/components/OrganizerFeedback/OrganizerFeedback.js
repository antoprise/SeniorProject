import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getOrgRoomById, orgRoomUnload } from "../../actions/orgRoomActions";
import {
  getOrgFeedbackList,
  orgFeedbackListUnload,
} from "../../actions/orgFeedbackActions";
import OrganizerFeedbackList from "./OrganizerFeedbackList";
import OrganizerFeedbackAnalyze from "./OrganizerFeedbackAnalyze";
import Loading from "../Loading/Loading";
import { Container, Row, Col, Button } from "reactstrap";
import apiUrl from '../../utils/apiUrl' 
//socket
import io from "socket.io-client";
//Export
import { exportFeedback } from "../../utils/export";

const OrganizerFeedback = (props) => {
  const {
    getOrgRoomById,
    orgRoomUnload,
    getOrgFeedbackList,
    orgFeedbackListUnload,
    orgRoom: { room, roomLoading },
    orgFeedback: { feedbackList, feedbackLoading },
    match,
  } = props;

  useEffect(() => {
    getOrgRoomById(match.params.roomid);
    return () => {
      orgRoomUnload();
    };
  }, [getOrgRoomById, match.params.roomid, orgRoomUnload]);

  useEffect(() => {
    let socket = io.connect(apiUrl);

    socket.emit("room", match.params.roomid);

    socket.on("organizerFeedback", (data) => {
      if (data.status === 200) {
        getOrgFeedbackList(match.params.roomid);
      }
    });

    getOrgFeedbackList(match.params.roomid);

    return () => {
      orgFeedbackListUnload();
      socket.disconnect();
    };
  }, [getOrgFeedbackList, match.params.roomid, orgFeedbackListUnload]);

  console.log(room);
  console.log(feedbackList);

  return roomLoading || feedbackLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container fluid>
          <h1 className="org-h1 text-center org-section">Feedback</h1>
        </Container>
        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col md="5" xs="12" className="mt-4">
              <h5 className="org-h5">
                ROOM: {room.roomName}
                <br />
                PIN: {room.code}
              </h5>
              {<OrganizerFeedbackList feedbackList={feedbackList} />}
            </Col>
            <Col md="5" xs="12" className="mt-4">
              {<OrganizerFeedbackAnalyze feedbackList={feedbackList} />}
              <Row>
                <Col md="12" xs="12" className="text-center mt-5">
                  <Button
                    className="org-btn"
                    onClick={() => exportFeedback(feedbackList)}
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
  orgFeedback: state.orgFeedback,
});

export default connect(mapStateToProps, {
  getOrgRoomById,
  getOrgFeedbackList,
  orgRoomUnload,
  orgFeedbackListUnload,
})(OrganizerFeedback);
