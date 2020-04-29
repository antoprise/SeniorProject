import React from "react";
import AskHistoryItem from "./AskHistoryItem";


const AskHistory = ({ askList }) => {
    return (

        <div >
        {console.log(askList)}
            {askList && askList.map((ask) => (<AskHistoryItem key={ask._id} ask={ask} />))}
        </div>
    )

}

export default AskHistory;

