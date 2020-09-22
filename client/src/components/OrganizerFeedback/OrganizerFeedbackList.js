import React from "react";
import OrganizerFeedbackItem from "./OrganizerFeedbackItem";

const OrganizerFeedbackList = ({ feedbackList }) => {
  return (
    <div className="org-box">
      <div className="pt-4 px-3">
        <h4 className="org-h4"> Feedback</h4>
        <hr className="border border-secondary" />
      </div>

      <div className="org-boxlist">
        {feedbackList.map((feedback) => (
          <OrganizerFeedbackItem key={feedback._id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default OrganizerFeedbackList;
