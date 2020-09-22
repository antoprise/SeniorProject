import React, { Fragment, useEffect,useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRoomById, roomUnload } from "../../actions/roomActions";
import { getUserFeedbackList, feedbackListUnload } from '../../actions/feedbackActions';
import { Container, Button, Row, Col} from "reactstrap";
import Loading from '../Loading/Loading';
import FeedbackForm from "../Feedback/FeedbackForm";
import NavBar from '../Navbar/NavBar';

const Feedback = (props) => {

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
      <div className="fullscreen bg fullscreen">
      <Container fluid className='topic'>
            <h1>FEEDBACK</h1>
          </Container>
        <Container>
            <FeedbackForm room={room}/>
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
  Feedback
);
