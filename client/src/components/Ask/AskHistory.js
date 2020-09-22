import React, { useEffect }  from "react";
import { css } from 'glamor';
import AskHistoryItem from "./AskHistoryItem";
import ScrollToBottom from 'react-scroll-to-bottom';


const AskHistory = ({ askList }) => {
    const ROOT_CSS = css({
        height: 300
      });
    return (
        <div class='ask-boxlist'>
        {console.log(askList)}
        <ScrollToBottom className={ ROOT_CSS }>
            {askList && askList.map((ask) => (<AskHistoryItem key={ask._id} ask={ask} />))}
        </ScrollToBottom>
        </div>
    )

}

export default AskHistory;

