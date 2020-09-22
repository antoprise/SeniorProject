import React, { useState } from "react";
import { connect } from "react-redux";
import { editQuestion, deleteQuestion } from "../../actions/orgQuestionActions";
import { Container, Row, Col, Button } from "reactstrap";

const EditQuestion = (props) => {
  const [newQuestion, setNewQuestion] = useState("");
  const {
    editQuestion,
    deleteQuestion,
    question: { _id, questionDetail },
    toggle,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    editQuestion(_id, { questionDetail: newQuestion });
    setNewQuestion("");
  };

  return (
    <Container className="pb-5">
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs="10">
            <input
              className="createroom-input text-break"
              type="text"
              name="newQuestion"
              placeholder={questionDetail}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
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
              onClick={toggle}
            >
              SAVE
            </Button>
          </Col>
          <Col xs="10" md="5" className="text-center mt-4">
            <Button
              type="button"
              onClick={() => deleteQuestion(_id)}
              className="btn btn-dark org-btn"
            >
              DELETE QUESTION
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default connect(null, { editQuestion, deleteQuestion })(EditQuestion);
