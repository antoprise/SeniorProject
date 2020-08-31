import React, { Fragment, useEffect,useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRoomById, roomUnload } from "../../actions/roomActions";
import { Container, Button, Row, Col} from "reactstrap";
import Loading from '../Loading/Loading';
import room_ask from '../../assets/room_ask.svg';
import room_question from '../../assets/room_question.svg';
import room_feedback from '../../assets/room_feedback.svg';


const RoomMenu = (props) => {

  const [edit, setEdit] = useState(false);
  const leave = () => setEdit(!edit);
  const {
    getRoomList,
    roomListUnload,
    getRoomById,
    room : {room,roomLoading},
    auth: { user },
    match
  } = props;
  

  useEffect(() => {
    getRoomById(match.params.id);
    return () => {
      roomUnload();
    };
  }, [getRoomById, match.params.id, roomUnload]);

  return (room == null|| roomLoading)? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen room-bg">
        <Container fluid className="head-room">
          <div className="p-4">
            <h1 className="room-h1">Welcome To</h1>
            <h3 className="room-h3">{room.roomName}</h3>
            <h3 className="room-h3" style={{marginTop:"20px"}}>{user.userName}</h3>
          </div>
        </Container>
        <Container fluid className="text-center btn-room">
        <div className="p-5">
            <br />
            <br />
            <br />
            <br />
          </div>
          <Col>
            <Link to={`/ask/${room._id}`}>
                <Button
                    className="room-box-ask"
                    style={{
                    backgroundColor: "white",
                    borderColor: "#e493c980",
                    color: "#FF4A4A",
                    borderRadius: "10px 10px 10px 10px",
                    fontSize: "24px",
                    borderRight: "50px solid",
                    }}
                    size="md"
                >
                <img src={room_ask} className="room-img"></img>
                ASK
                </Button>
            </Link>
          </Col>
          <Col>
            <Link to={`/ask/${room._id}`}>
                <Button
                    className="room-box-question"
                    style={{
                    backgroundColor: "white",
                    borderColor: "#e493c980",
                    color: "#FEBE5F",
                    borderRadius: "10px 10px 10px 10px",
                    fontSize: "24px",
                    borderRight: "50px solid"
                    }}
                    size="md"
                >
                <img src={room_question} className="room-img"></img>
                QUESTION
                </Button>
            </Link>
          </Col>
          <Col>
                <Button
                    className="room-box-feedback"
                    style={{
                    backgroundColor: "white",
                    borderColor: "#e493c980",
                    color: "#7ADF7E",
                    borderRadius: "10px 10px 10px 10px",
                    fontSize: "24px",
                    borderRight: "50px solid"
                    }}
                    size="md"
                >
                <img src={room_feedback} className="room-img"></img>
                FEEDBACK
                </Button>
          </Col>
            <div className="mt-5">
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>

          </div>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  room: state.room,
  auth: state.auth
});

export default connect(mapStateToProps, { getRoomById, roomUnload })(
  RoomMenu
);