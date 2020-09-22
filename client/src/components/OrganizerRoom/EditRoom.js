import React, { useState } from "react";
import { connect } from "react-redux";
import { editRoomName, deleteRoom } from "../../actions/orgRoomActions";
import { Container, Row, Col, Button } from "reactstrap";

const EditRoom = (props) => {
  const [roomNewName, setRoomNewName] = useState("");
  const {
    editRoomName,
    deleteRoom,
    room: { _id, roomName },
    toggle
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    editRoomName(_id, { roomName: roomNewName });
    setRoomNewName("");
  };

  return (
    <Container className="pb-5">
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs="10">
            <input
              className="createroom-input text-break"
              type="text"
              name="roomNewName"
              placeholder={roomName}
              value={roomNewName}
              onChange={(e) => setRoomNewName(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="submit"
              value="Submit"
              className="btn btn-dark org-btn"
              onClick={toggle}
            >
              SAVE
            </Button>
          </Col>
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              onClick={() => deleteRoom(_id)}
              className="btn btn-dark org-btn"
            >
              DELETE ROOM
            </Button>
          </Col>

          {/* <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              onClick={toggle}
              className="btn btn-dark org-btn"
            >
              CANCEL
            </Button>
          </Col> */}
        </Row>
      </form>
    </Container>
  );
};

export default connect(null, { editRoomName, deleteRoom })(EditRoom);
