import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import OrganizerPresentList from "./OrganizerPresentList";
import { getOrgAskList, orgAskListUnload } from "../../actions/orgAskActions";
import { getOrgRoomById, orgRoomUnload } from "../../actions/orgRoomActions";
import { Container } from "reactstrap";
import Loading from "../Loading/Loading";
import apiUrl from '../../utils/apiUrl' 
import io from "socket.io-client";

const OrganizerPresent = ({
  getOrgRoomById,
  orgRoomUnload,
  getOrgAskList,
  orgAskListUnload,
  orgRoom: { room, roomLoading },
  orgAsk: { askList, askLoading },
  match,
}) => {
  useEffect(() => {
    getOrgRoomById(match.params.roomid);
    return () => {
      orgRoomUnload();
    };
  }, [getOrgRoomById, match.params.roomid, orgRoomUnload]);

  useEffect(() => {
    let socket = io.connect(apiUrl);

    socket.emit("room", match.params.roomid);

    socket.on("organizerAsk", (data) => {
      if (data.status === 200) {
        getOrgAskList(match.params.roomid);
      }
    });

    getOrgAskList(match.params.roomid);

    return () => {
      orgAskListUnload();
      socket.disconnect();
    };
  }, [getOrgAskList, match.params.roomid, orgAskListUnload]);

  return roomLoading || askLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container fluid>
          <h1 className="org-h1 text-center org-section">Ask Presentation</h1>
        </Container>
        <Container fluid>
          <h5 className="org-h5 text-center">
            ROOM: {room.roomName}
            <br />
            PIN: {room.code}
          </h5>

          {<OrganizerPresentList askList={askList} />}
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orgRoom: state.orgRoom,
  orgAsk: state.orgAsk,
});

export default connect(mapStateToProps, {
  getOrgRoomById,
  getOrgAskList,
  orgRoomUnload,
  orgAskListUnload,
})(OrganizerPresent);
