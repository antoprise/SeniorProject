import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const QuestionItem = (props) => {
  const { room, question } = props;

  return (
    <Fragment>
      <Link to={`/${room._id}/answer/${question._id}`}>
        <Button
          className="question-boxitem text-break"
          style={{
            backgroundColor: "#E5E5E5",
            borderColor: "#E5E5E5",
            color: "black",
            borderRadius: "10px 10px 10px 10px",
          }}
          size="lg"
        >
          <div className="text-break">{question.questionDetail}</div>
        </Button>
      </Link>{" "}
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default QuestionItem;
