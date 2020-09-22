import React, { Fragment, useEffect,useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRoomById, roomUnload } from "../../actions/roomActions";
import { getQuestionById, questionUnload } from "../../actions/questionAction";
import { Container, Button, Row, Col} from "reactstrap";
import Loading from '../Loading/Loading';
import AnswerForm from "../Answer/AnswerForm";

const Answer = (props) => {

  const [edit, setEdit] = useState(false);
  const leave = () => setEdit(!edit);
  const {
    getQuestionById,
    questionUnload,
    getRoomById,
    room : {room,roomLoading},
    question : {question,questionLoading},
    match
  } = props;
  

  useEffect(() => {
    getRoomById(match.params.roomid);
    return () => {
      roomUnload();
    };
  }, [getRoomById, match.params.id, roomUnload]);

  useEffect(() => {
    getQuestionById(match.params.questionid);
    return () => {
      questionUnload();
    };
  }, [getQuestionById, match.params.questionid, questionUnload]);



  return ((room == null || roomLoading) || (question ==null || questionLoading))? (
    <Loading></Loading>
  ) : (
    <Fragment>
      <div className="fullscreen bg fullscreen">
      <Container fluid className='topic'>
            <h1>ANSWER</h1>
          </Container>
        <Container>
            <AnswerForm room={room} question={question}/>
        </Container>
     </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  room: state.room,
  question: state.question
});

export default connect(mapStateToProps, { getRoomById, roomUnload, getQuestionById, questionUnload})(
  Answer
);
