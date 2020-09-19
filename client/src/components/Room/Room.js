import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRoomList, roomListUnload } from "../../actions/roomActions";
import leave_room from "../../assets/leave-white.svg";
import RoomList from "./RoomList";
import { Container, Button } from "reactstrap";
import Loading from "../Loading/Loading";

const Room = (props) => {
  const [edit, setEdit] = useState(false);
  const leave = () => setEdit(!edit);
  const {
    getRoomList,
    roomListUnload,
    room: { roomList, roomLoading },
    auth: { user },
  } = props;

  useEffect(() => {
    getRoomList();

    return () => {
      roomListUnload();
    };
  }, [getRoomList, roomListUnload]);

  console.log(roomList);

  return roomLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen room-bg">
        <Container fluid className="head-room">
          <div className="p-4">
            <h1 className="room-h1 text-break">Hi "{user.userName}"</h1>
            <br /> <h3 className="room-h3">SELECT ROOM</h3>
          </div>
        </Container>
        <Container fluid className="text-center">
          <div className="p-5">
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          {<RoomList roomList={roomList} edit={edit} />}
          <div className="p-4"></div>

          {!edit ? (
            <Button
              className="btn-leave"
              onClick={leave}
              style={{
                backgroundColor: "#C19AD8",
                borderColor: "white",
                color: "white",
                borderRadius: "10px 10px 10px 10px",
                fontSize: "24px",
              }}
              size="md"
            >
              <div>
                <img
                  src={leave_room}
                  className="leave-white"
                  width="38px"
                  height="38px"
                ></img>{" "}
                LEAVE ROOM
              </div>
            </Button>
          ) : (
            <Button
              className="btn-leave"
              onClick={leave}
              style={{
                backgroundColor: "#4BB543",
                borderColor: "white",
                color: "white",
                borderRadius: "10px 10px 10px 10px",
                fontSize: "24px",
              }}
              size="md"
            >
              COMPLETE
            </Button>
          )}
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  room: state.room,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRoomList, roomListUnload })(Room);
