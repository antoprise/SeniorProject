import React, { Fragment, useState } from "react";
import OrganizerQuestionItem from "./OrganizerQuestionItem";
import {
  Card,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Container,
} from "reactstrap";
import plus from "../../assets/button.svg";
import CreateQuestion from "./CreateQuestion";

const OrganizerQuestionList = (props) => {
  const [modal, setModal] = useState(false);
  const { room, question, questionList } = props;
  const toggle = () => setModal(!modal);

  const [edit, setEdit] = useState(false);
  const manage = () => setEdit(!edit);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <Fragment>
      <div className=" px-4">
        <Container fluid>
          <Row className="pt-4">
            <Col className="text-left mt-2">
              <h4 className="org-h3"> Question </h4>
            </Col>
            <Col className="text-right mt-2">
              {!edit ? (
                <Button
                  onClick={manage}
                  className="org-btn"
                  style={{
                    backgroundColor: "#FF8BA7",
                    borderColor: "#121629",
                    borderWidth: "2px",
                    color: "#232946",
                  }}
                >
                  MANAGE QUESTION
                </Button>
              ) : (
                <Button onClick={manage} className="btn btn-light org-btn">
                  COMPLETE
                </Button>
              )}
            </Col>
          </Row>
          <hr />
        </Container>
        {Array.isArray(questionList)}
        {questionList.map((question) => (
          <OrganizerQuestionItem
            key={question._id}
            question={question}
            room={room}
            edit={edit}
          />
        ))}
      </div>
      <div className=" pt-3 px-4">
        <Container fluid>
          <Card>
            <Button
              onClick={toggle}
              size="lg"
              style={{
                backgroundColor: "#EEBBC3",
                borderColor: "#EEBBC3",
                color: "black",
              }}
              className="pre-box pt-4"
            >
              <p className="org-p">
                CREATE NEW QUESTION{" "}
                <img src={plus} width="40px" height="40px"></img>
              </p>
            </Button>
          </Card>
        </Container>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader
          close={closeBtn}
          className="border-0 pb-0"
          cssModule={{ "modal-title": "w-100 text-center pt-5" }}
        >
          <p className="org-h4">CREATE NEW QUESTION</p>
        </ModalHeader>
        <ModalBody>
          <div>
            <CreateQuestion toggle={toggle} question={question} room={room} />
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default OrganizerQuestionList;
