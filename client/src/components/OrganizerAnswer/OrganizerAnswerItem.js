import React from "react";

const OrganizerAnswerItem = (props) => {
  const {
    answer: {
      user: { userName },
      text,
      date,
    },
  } = props;
  const time = new Date(date);
  return (
    <div className="boxitem">
      <div className="org-p p-2 text-break">
        {text} <br />- Answer from: {userName} at {time.toUTCString()}
      </div>
    </div>
  );
};

export default OrganizerAnswerItem;
