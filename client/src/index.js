import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authActions';

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

if (localStorage.token) {  // check token from localStorage
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
}

ReactDOM.render((
<Provider store={store}>
    <Router>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>
</Provider>

),document.getElementById('root'));

