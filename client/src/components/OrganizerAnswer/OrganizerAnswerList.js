import React from "react";
import OrganizerAnswerItem from "./OrganizerAnswerItem";

const OrganizerAnswerList = ({ answerList }) => {
  return (
    <div className="org-box">
      <div className="pt-4 px-3">
        <h4 className="org-h4"> Answer</h4>
        <hr className="border border-secondary" />
      </div>

      <div className="org-boxlist">
        {answerList.map((answer) => (
          <OrganizerAnswerItem key={answer._id} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default OrganizerAnswerList;
