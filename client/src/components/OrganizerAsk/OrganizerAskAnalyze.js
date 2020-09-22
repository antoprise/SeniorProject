import React from "react";
import { Row, Col } from "reactstrap";

const OrganizerAskAnalyze = (props) => {
  const { askList } = props;

  const countAsker = () => {
    const distinctId = [...new Set(askList.map((ask) => ask.user._id))];
    return distinctId.length;
  };

  return (
    <div>
      <h2 className="org-h2 text-center"> Analyze</h2>
      {console.log(askList)}
      <Row>
        <Col md="6" xs="12" className="mt-5">
          <h1 className="text-center font-weight-bold display-1">
            {askList.length}
          </h1>
          <h2 className="org-h2 text-center">All questions</h2>
        </Col>
        <Col md="6" xs="12" className="mt-5">
          <h1 className="text-center font-weight-bold display-1">
            {countAsker()}
          </h1>
          <h2 className="org-h2 text-center">Asker</h2>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizerAskAnalyze;
