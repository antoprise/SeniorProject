import React, { useState } from "react";
import { addAsk } from "../../actions/askActions";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import sent from "../../assets/sent1.svg";

const AskForm = (props) => {
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const{
    room, 
    addAsk
  } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomId = room._id;
    addAsk({ roomId, text, anonymous });
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Row className="mt-2">
          <Col xs="12" className="p-2">
            <input
              className="askText text-break"
              type="text"
              name="text"
              placeholder="Write the question"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="text-left mt-2">
            <div className="custom-control custom-switch text-left  ">
              <input
                type="checkbox"
                className="custom-control-input"
                id="anonymousSwitch"
                value={anonymous}
                onChange={() => setAnonymous(!anonymous)}
              />
             
              <label
                className="custom-control-label anonymous"
                htmlFor="anonymousSwitch"
              >
                Send as Anonymous
              </label>
            </div>
          </Col>
          <Col xs="6" className="text-right mt-2">
            <button type="submit" className="btnAdvance" disabled={!room.askStatus}>
              <img src={sent}></img>
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default connect(null, { addAsk })(AskForm);
