import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserAskList, askListUnload } from "../../actions/askActions";
import { getRoomById, roomUnload } from "../../actions/roomActions";
import Loading from "../Loading/Loading";
import AskHistory from "./AskHistory";
import AskForm from "./AskForm";
import { Container, Row, Col } from "reactstrap";

const Ask = (props) => {
  const {
    getRoomById,
    roomUnload,
    getUserAskList,
    askListUnload,
    ask: { askList, askLoading },
    room: { room, roomLoading },
    match,
  } = props;

  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = d.getDay();
  const dayName = days[dayIndex];
  const timeString = dayName + " " + day + "-" + month + "-" + year;

  useEffect(() => {
    getRoomById(match.params.roomid);
    return () => {
      roomUnload();
    };
  }, [getRoomById, match.params.roomid, roomUnload]);

  useEffect(() => {
    getUserAskList(match.params.roomid);
    return () => {
      askListUnload();
    };
  }, [getUserAskList, match.params.roomid, askListUnload]);

  return askLoading || roomLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="ask-section bg fullscreen">
        <Container fluid className="topic">
          <h1>ASK</h1>
        </Container>

        <Container>
          <Row>
            <Col className="ask-box mx-2">
              <h4 className="askRoomName text-break">ROOM : {room.roomName}</h4>
              <div className="todayTime">Today : {timeString}</div>
              <hr className="border border-secondary" />
              {askList && <AskHistory askList={askList} />}
            </Col>
          </Row>
        </Container>
        <Container class="ask-form">
          {room && <AskForm room={room} />}
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  room: state.room,
  ask: state.ask,
});

export default connect(mapStateToProps, {
  getRoomById,
  getUserAskList,
  roomUnload,
  askListUnload,
})(Ask);
