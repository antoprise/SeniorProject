import React, { useState } from "react";
import { addFeedback } from "../../actions/feedbackActions";
import { connect } from "react-redux";
import { Container, Row, Col, Input } from "reactstrap";
import smile from '../../assets/4pts.svg';
import normal from '../../assets/3pts.svg';
import confuse from '../../assets/2pts.svg';
import sleep from '../../assets/1pts.svg';
const FeedbackForm = (props) => {
  const [text, setText] = useState("");
  const [emoticon, setEmoticon] = useState("");
  const{
    room, 
    addFeedback
  } = props

  const onRadioChange = (e) => {
    setEmoticon(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = room._id;
    addFeedback({ roomId, text, emoticon});
    setText("");
    setEmoticon("");
    };

  return (
    <div className="feedback-box">
      <form onSubmit={handleSubmit}>   
      <Container>
        <p className="feedback-topic">ROOM : {room.roomName}</p>
        <Row className="feedback-section">
          <Col>
          <img src={smile} className="feedback-img" ></img>
          <br/>
          <input type="radio" name="emoticon" id="feedbackRadio4" value="4" checked={emoticon === '4' }
          onChange={onRadioChange} className="radio-feedback" />
          <br/>
          <p className="feedback-point">4 pts</p>
          </Col>
          <Col>
          <img src={normal} className="feedback-img" ></img>
          <br/>
          <input type="radio" name="emoticon" id="feedbackRadio3" value="3" checked={emoticon === '3' }
          onChange={onRadioChange} className="radio-feedback"/>
          <br/>
          <p className="feedback-point">3 pts</p>
          </Col>
          <Col>
          <img src={confuse} className="feedback-img" ></img>
          <br/>
          <input type="radio" name="emoticon" id="feedbackRadio2" value="2" checked={emoticon === '2' }
          onChange={onRadioChange} className="radio-feedback" />
          <br/>
          <p className="feedback-point">2 pts</p>
          </Col>
          <Col>
          <img src={sleep} className="feedback-img"></img>
          <br/>
          <input type="radio" name="emoticon" id="feedbackRadio1" value="1" checked={emoticon === '1' }
          onChange={onRadioChange} className="radio-feedback"/>
          <br/>
          <p className="feedback-point">1 pts</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs="12" className="p-2">
            <textarea 
              className="askText suggestion text-break"
              type="text"
              name="text"
              placeholder="Suggestion/Review"
              value={text}
              onChange={(e) => setText(e.target.value)}
              />
          </Col>
        </Row>
        </Container>
        <Row>
          <Col className="text-center mt-2">
            <button class="btn btn-primary submit-feedback" type="submit">
              SUBMIT
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default connect(null, { addFeedback })(FeedbackForm);
