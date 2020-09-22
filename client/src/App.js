import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React,{useEffect} from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import Routes from './components/routing/Routes';
// import Home from "./components/Home";
import Login from './components/Login/Login';
import LoginOrg from './components/Login/LoginOrg';
import queryString from "query-string";
import HandleRedirect from './components/routing/HandleRedirect'
//Redux
import store from "./store";
import {loadToken,loadUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  const token = queryString.parse(useLocation().search).token
  
  useEffect(() => {
    if(token){   // check token from queryString
      store.dispatch(loadToken(token))
      setAuthToken(token)
      store.dispatch(loadUser());
    }
  }, []);
  
  return (
    <Switch>
      <Route exact path="/" component={HandleRedirect} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/organizer/login" component={LoginOrg} />
      {/* <Route exact path="/" component={Home} /> */}
      <Route component={Routes} />
    </Switch>
  );
};

export default App;
