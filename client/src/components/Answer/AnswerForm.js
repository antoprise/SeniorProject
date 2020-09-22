import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Input } from "reactstrap";
import { addAnswer } from "../../actions/answerActions";
const AnswerForm = (props) => {
  const [text, setText] = useState("");
  const{
    room, 
    question,
    addAnswer
  } = props;

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = room._id;
    const questionId = question._id;
    addAnswer({ roomId, questionId ,text});
    setText("");
    };

  return (
    <div className="answer-box">
      <form onSubmit={handleSubmit}>   
      <Container>
       {/*<p className="answer-room">ROOM : {room.roomName}</p>*/}
        <div className="question-card">
          <div className="question-detail text-break">
            QUESTION : 
            <p>{question.questionDetail}</p>
          </div>
        </div>
        <Row className="mt-4">
          <Col xs="12" className="p-2">
            <textarea 
              className="answerText answer text-break"
              type="text"
              name="text"
              placeholder="Answer..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              />
          </Col>
        </Row>
        </Container>
        <Row>
          <Col className="text-center mt-2">
            <button class="btn btn-primary submit-answer mb-2" type="submit">
              SUBMIT
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default connect(null, { addAnswer })(AnswerForm);
