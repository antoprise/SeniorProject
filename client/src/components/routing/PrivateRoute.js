import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading'

const PrivateRoute = (props) => {
  const {
    component: Component,
    auth: { isAuthenticated, authLoading, token },
    path,
    ...rest
  } = props

  let redirectLogin = '/login'
  if(path.indexOf('/organizer') > -1){
    redirectLogin = '/organizer/login'
  }
  return ((token !== null && authLoading)) ? (
    <Loading></Loading>
  ):(
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={redirectLogin} />
      }
    />
  )

}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
