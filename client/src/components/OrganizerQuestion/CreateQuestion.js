import React, { useState } from "react";
import { connect } from "react-redux";
import { createQuestion } from "../../actions/orgQuestionActions";
import { Container, Row, Col, Button } from "reactstrap";

const CreateQuestion = (props) => {
  const [questionDetail, setQuestionDetail] = useState("");
  const { createQuestion, toggle, room } = props;
  const roomId = room._id;
  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestion({ roomId, questionDetail });
    setQuestionDetail("");
    toggle();
  };

  return (
    <Container className="pb-5">
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs="10">
            <input
              className="createroom-input text-break"
              type="text"
              name="questionDetail"
              placeholder="ENTER QUESTION"
              value={questionDetail}
              onChange={(e) => setQuestionDetail(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="submit"
              value="Submit"
              className="btn btn-dark org-btn"
            >
              CREATE
            </Button>
          </Col>

          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              onClick={toggle}
              className="btn btn-dark org-btn"
            >
              CANCEL
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default connect(null, { createQuestion })(CreateQuestion);
