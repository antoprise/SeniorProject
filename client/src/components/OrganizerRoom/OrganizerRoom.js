import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getOrgRoomList,
  orgRoomListUnload,
} from "../../actions/orgRoomActions";
import OrganizerRoomList from "./OrganizerRoomList";
import { Container, Row, Button } from "reactstrap";
import Loading from "../Loading/Loading";

const OrganizerRoom = (props) => {
  const [edit, setEdit] = useState(false);
  const manage = () => setEdit(!edit);

  const {
    getOrgRoomList,
    orgRoomListUnload,
    orgRoom: { roomList, roomLoading },
    auth: { user },
  } = props;

  useEffect(() => {
    getOrgRoomList();
    return () => {
      orgRoomListUnload();
    };
  }, [getOrgRoomList, orgRoomListUnload]);

  return roomLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container>
          <div className="pt-5">
            <h1 className="text-center org-room">Hi "{user.userName}"</h1>
          </div>
        </Container>
        <Container>
          <div className="pt-2 px-4">
            <h3 className="text-center org-room">Organizer ROOM</h3>
            <hr />
          </div>
          <Row>
            <div>{<OrganizerRoomList roomList={roomList} edit={edit} />}</div>
          </Row>
          <Row className="justify-content-center mt-2">
            {!edit ? (
              <Button
                onClick={manage}
                className="org-btn"
                style={{
                  backgroundColor: "#FF8BA7",
                  borderColor: "#121629",
                  borderWidth: "2px",
                  color: "#232946",
                }}
              >
                MANAGE ROOM
              </Button>
            ) : (
              <Button
                onClick={manage}
                className="org-btn"
                style={{
                  backgroundColor: "#232946",
                  borderColor: "#FF8BA7",
                  borderWidth: "2px",
                  color: "#FF8BA7",
                }}
              >
                COMPLETE
              </Button>
            )}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orgRoom: state.orgRoom,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getOrgRoomList,
  orgRoomListUnload,
})(OrganizerRoom);
