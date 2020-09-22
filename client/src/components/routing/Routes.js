import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Ask from "../Ask/Ask";
import Room from "../Room/Room";
import OrganizerRoom from "../OrganizerRoom/OrganizerRoom";
import OrganizerAsk from "../OrganizerAsk/OrganizerAsk";
import OrganizerPresent from "../OrganizerPresentation/OrganizerPresent";
import NotFound from "../layout/NotFound";
// import Login from "../Login/Login";
// import LoginOrg from "../Login/LoginOrg";
import PrivateRoute from "../routing/PrivateRoute";
import OrganizerFeedback from "../OrganizerFeedback/OrganizerFeedback";
import OrganizerMenu from "../OrganizerMenu/OrganizerMenu";
import RoomMenu from "../RoomMenu/RoomMenu";
// import Alert from "../layout/Alert";
import OrganizerQuestion from "../OrganizerQuestion/OrganizerQuestion";
import Feedback from "../Feedback/Feedback";
import OrganizerAnswer from "../OrganizerAnswer/OrganizerAnswer";
import NavBar from "../Navbar/NavBar"
import Answer from "../Answer/Answer";
import Question from "../Question/Question";

const Routes = () => {
  return (
    <Fragment>
      {/* <Alert /> */}
      <NavBar />
      <Switch>
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/organizer/login" component={LoginOrg} /> */}
        <PrivateRoute exact path="/room" component={Room} />
        <PrivateRoute exact path="/:roomid" component={RoomMenu} />
        <PrivateRoute exact path="/:roomid/ask" component={Ask} />
        <PrivateRoute exact path="/:id/feedback" component={Feedback}/>
        <PrivateRoute exact path="/:roomid/question" component={Question} />
        <PrivateRoute exact path="/:roomid/answer/:questionid" component={Answer} /> 
        <PrivateRoute exact path="/organizer/room" component={OrganizerRoom} />
        <PrivateRoute
          exact
          path="/organizer/:roomid"
          component={OrganizerMenu}
        />
        <PrivateRoute
          exact
          path="/organizer/:roomid/ask"
          component={OrganizerAsk}
        />
        <PrivateRoute
          exact
          path="/organizer/:roomid/ask/present"
          component={OrganizerPresent}
        />
        <PrivateRoute
          exact
          path="/organizer/:roomid/feedback"
          component={OrganizerFeedback}
        />
        <PrivateRoute
          exact
          path="/organizer/:roomid/question"
          component={OrganizerQuestion}
        />
        <PrivateRoute
          exact
          path="/organizer/:roomid/answer/:questionid"
          component={OrganizerAnswer}
        />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
