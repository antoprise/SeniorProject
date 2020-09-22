import React from "react";
import smile from '../../assets/4pts.svg';
import normal from '../../assets/3pts.svg';
import confuse from '../../assets/2pts.svg';
import sleep from '../../assets/1pts.svg';


const OrganizerFeedbackItem = (props) => {
  const {
    feedback: { emoticon, text, date },
  } = props;
  const time = new Date(date);

  let emoticonPic  ; 

  if(emoticon === '1'){
    emoticonPic = sleep
  }
  if(emoticon === '2'){
    emoticonPic = confuse
  }
  if(emoticon === '3'){
    emoticonPic = normal
  }
  if(emoticon === '4'){
    emoticonPic = smile
  }

  return (
    <div className="boxitem">
      <div className="org-p p-2 text-break">
        <img src={emoticonPic} className="feedback-org-item-img" ></img>
        {text}
        <br />{time.toUTCString()}
      </div>
    </div>
  );
};

export default OrganizerFeedbackItem;
