import React  from 'react' ;
import { Row, Col } from 'reactstrap';
import OrganizerFeedbackChart from "./OrganizerFeedbackChart";

const OrganizerFeedbackAnalyze = props =>{
    const {feedbackList} = props

    return (
        <div>
            <h2 className='org-h2 text-center'> Analyze</h2>
            <OrganizerFeedbackChart feedbackList={feedbackList}/>
        </div>
    )

}

export default OrganizerFeedbackAnalyze ;
