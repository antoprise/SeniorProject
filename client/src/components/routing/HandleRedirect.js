import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading'

const PrivateRoute = (props) => {
  const {
    auth: { isAuthenticated, authLoading, token },
  } = props

  return ((token !== null && authLoading)) ? (
    <Loading></Loading>
  ):(
    isAuthenticated ? <Redirect to='/room' /> : <Redirect to='/login' />
  )

}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
