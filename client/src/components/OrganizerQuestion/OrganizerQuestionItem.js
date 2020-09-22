import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Card,
  Row,
  Col,
} from "reactstrap";
import EditQuestion from "./EditQuestion";
import editq from "../../assets/editq.svg";

const OrganizerQuestionItem = (props) => {
  const { room, question, edit } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <Fragment>
      {!edit ? (
        <div className="container-fluid pt-3">
          <Link to={`/organizer/${room._id}/answer/${question._id}`}>
            <Card>
              <Button
                color="#e5e5e5"
                size="lg"
                style={{
                  backgroundColor: "#B8C1EC",
                  borderColor: "#B8C1EC",
                  color: "black",
                }}
                className="pre-box"
              >
                <Row className="justify-content-center pt-1 text-break">
                  {question.questionDetail}
                </Row>
              </Button>
            </Card>
          </Link>
        </div>
      ) : (
        <div className="container-fluid pt-3">
          <Card>
            <Button
              onClick={toggle}
              color="#e5e5e5"
              size="lg"
              style={{
                backgroundColor: "#e5e5e5",
                borderColor: "#e5e5e5",
                color: "black",
              }}
              className="pre-box"
            >
              <div className="pt-2">
                <Row>
                  <Col></Col>
                  <Col className="pt-2">{question.questionDetail}</Col>
                  <Col className="text-right">
                    <img src={editq} width="48px" height="48px"></img>
                  </Col>
                </Row>
              </div>
            </Button>
          </Card>
        </div>
      )}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader
          close={closeBtn}
          className="border-0 pb-0"
          cssModule={{ "modal-title": "w-100 text-center pt-5" }}
        >
          <p className="org-h4">EDIT QUESTION</p>
        </ModalHeader>
        <ModalBody>
          <div>
            <EditQuestion toggle={toggle} question={question} />
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default OrganizerQuestionItem;
