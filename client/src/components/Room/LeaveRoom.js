import React, { useState } from "react";
import { connect } from "react-redux";
import { leaveRoom } from "../../actions/roomActions";
import { Container, Row, Col, Button } from "reactstrap";

const LeaveRoom = (props) => {
  const {
    leaveRoom,
    room: { _id, roomName },
    toggle
  } = props;

  return (
    <Container className="pb-5">
        <Row className="justify-content-center">
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              onClick={() => leaveRoom(_id)}
              className="btn btn-dark org-btn"
            >
              LEAVE ROOM
            </Button>
          </Col>
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              className="btn btn-dark org-btn"
              onClick={toggle}
            >
              CANCEL
            </Button>
          </Col>
        </Row>
    </Container>
  );
};

export default connect(null, { leaveRoom })(LeaveRoom);
