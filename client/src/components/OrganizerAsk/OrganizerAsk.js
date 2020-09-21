import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOrgRoomById, orgRoomUnload } from "../../actions/orgRoomActions";
import { getOrgAskList, orgAskListUnload } from "../../actions/orgAskActions";
import OrganizerAskList from "./OrganizerAskList";
import OrganizerAskAnalyze from "./OrganizerAskAnalyze";
import Loading from "../Loading/Loading";
import { Container, Row, Col, Button } from "reactstrap";
//socket
import io from "socket.io-client";
//Navbar
import NavbarOrg from '../Navbar/NavbarOrg';
//export
import {exportAsk} from '../../utils/export';


const OrganizerAsk = (props) => {
  const {
    getOrgRoomById,
    orgRoomUnload,
    getOrgAskList,
    orgAskListUnload,
    orgRoom: { room, roomLoading },
    orgAsk: { askList, askLoading },
    match,
  } = props;

  useEffect(() => {
    getOrgRoomById(match.params.roomid);
    return () => {
      orgRoomUnload();
    };
  }, [getOrgRoomById, match.params.roomid, orgRoomUnload]);

  useEffect(() => {
    let socket = io.connect("http://localhost:5000");

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

  console.log(room);
  console.log(askList);

  return roomLoading || askLoading ? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <NavbarOrg></NavbarOrg>
      <Container fluid>
        <h1 className="org-h1 text-center">ASK</h1>
      </Container>
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col md="5" xs="12" className="mt-4">
            <h5 className="org-h5">
              ROOM: {room.roomName}
              <br />
              ROOMID: {room._id}
            </h5>
            {<OrganizerAskList askList={askList} />}
          </Col>
          <Col md="5" xs="12" className="mt-4">
            {<OrganizerAskAnalyze askList={askList} />}
            <Row>
              <Col md="6" xs="12" className="text-center mt-5">
                <Button className="btn btn-dark org-btn" onClick={() => exportAsk(askList)}>Export</Button>
              </Col>
              <Col md="6" xs="12" className="text-center mt-5">
                <Link
                  to={`/organizer/${room._id}/ask/present`}
                  className="btn btn-dark org-btn"
                >
                  Presentaion
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
})(OrganizerAsk);
