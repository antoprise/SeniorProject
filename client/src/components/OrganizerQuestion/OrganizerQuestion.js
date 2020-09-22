import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import OrganizerQuestionList from "./OrganizerQuestionList";
import {
  getOrgQuestionList,
  orgQuestionListUnload,
} from "../../actions/orgQuestionActions";
import { getOrgRoomById, orgRoomUnload } from "../../actions/orgRoomActions";
import { Container } from "reactstrap";
import Loading from "../Loading/Loading";
import apiUrl from '../../utils/apiUrl' 
import io from "socket.io-client";

const OrganizerQuestion = (props) => {
  const {
    getOrgRoomById,
    orgRoomUnload,
    getOrgQuestionList,
    orgQuestionListUnload,
    orgRoom: { room, roomLoading },
    orgQuestion: { questionList, questionLoading },
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

    socket.on("organizerQuestion", (data) => {
      if (data.status === 200) {
        getOrgQuestionList(match.params.roomid);
      }
    });

    getOrgQuestionList(match.params.roomid);

    return () => {
      orgQuestionListUnload();
      socket.disconnect();
    };
  }, [getOrgQuestionList, match.params.roomid, orgQuestionListUnload]);

  return roomLoading || questionLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg">
        <Container fluid>
          <h1 className="org-h1 text-center">Q&A</h1>
        </Container>
        <Container fluid>
          <h5 className="org-h5 text-center">
            ROOM: {room.roomName}
            <br />
            PIN: {room.code}
          </h5>

          {<OrganizerQuestionList questionList={questionList} room={room} />}
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orgRoom: state.orgRoom,
  orgQuestion: state.orgQuestion,
});

export default connect(mapStateToProps, {
  getOrgRoomById,
  getOrgQuestionList,
  orgRoomUnload,
  orgQuestionListUnload,
})(OrganizerQuestion);
