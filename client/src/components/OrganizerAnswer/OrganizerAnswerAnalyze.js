import React from "react";
import { Row, Col } from "reactstrap";

const OrganizerAnswerAnalyze = (props) => {
  const { answerList } = props;

  const countAnswerer = () => {
    const distinctId = [
      ...new Set(answerList.map((answer) => answer.user._id)),
    ];
    return distinctId.length;
  };

  return (
    <div>
      <h2 className="org-h2 text-center"> Analyze</h2>
      {console.log(answerList)}
      <Row>
        <Col md="6" xs="12" className="mt-5">
          <h1 className="text-center font-weight-bold display-1">
            {answerList.length}
          </h1>
          <h2 className="org-h2 text-center">All answers</h2>
        </Col>
        <Col md="6" xs="12" className="mt-5">
          <h1 className="text-center font-weight-bold display-1">
            {countAnswerer()}
          </h1>
          <h2 className="org-h2 text-center">Answerer</h2>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizerAnswerAnalyze;
