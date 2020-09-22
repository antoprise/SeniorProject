import React, { useState, Fragment } from "react";
import RoomItem from "./RoomItem";
import { Container, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import plus from "../../assets/plus.svg";
import leave_room from "../../assets/leave.svg";
import JoinRoom from "./JoinRoom";
const RoomList = (props) => {
  const [modal, setModal] = useState(false);
  const { roomList, edit } = props;

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Container className="text-center">
        {Array.isArray(roomList)}
        {roomList.map((room) => (
          <RoomItem key={room._id} room={room} edit={edit} />
        ))}
        <Button
          className="btn-join"
          onClick={toggle}
          style={{
            backgroundColor: "#d4d8f0",
            borderColor: "#121629",
            color: "#232946",
            borderRadius: "10px 10px 10px 10px",
            fontSize: "24px",
          }}
          size="md"
        >
          <div>
            <img
              src={plus}
              className="plus-img"
              width="38px"
              height="38px"
            ></img>{" "}
            JOIN ROOM
          </div>
        </Button>
      </Container>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader
          close={closeBtn}
          className="border-0 pb-0"
          cssModule={{ "modal-title": "w-100 text-center pt-5" }}
        >
          <p className="org-h4">JOIN ROOM</p>
        </ModalHeader>
        <ModalBody>
          <div>
            <JoinRoom toggle={toggle} />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RoomList;
