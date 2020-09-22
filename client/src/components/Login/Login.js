import React, { Fragment } from 'react';
import logo from '../../assets/logo.svg';
import googlelogin from '../../assets/signin.svg';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import apiUrl from '../../utils/apiUrl' ;

const Login = (props) => {
    const {
        isAuthenticated
    } = props

    if (isAuthenticated) {
        return <Redirect to='/room' />;
    }

    return (
        <Fragment>
            <div className='bg fullscreen'>
                <Container  >
                    <Row className='justify-content-center align-items-center '>
                        <img src={logo} alt='Interask' className='img-fluid '></img>
                    </Row>
                    <Row className='justify-content-center align-items-center button'>
                        {/* <a href={`${apiUrl}/api/auth/google`}><img src={googlelogin} alt='Interask' className='img-fluid' style={{width:'340px'}} /></a> */}
                        <a href={`https://ask-project.herokuapp.com/api/auth/google`}><img src={googlelogin} alt='Interask' className='img-fluid' style={{width:'340px'}} /></a>
                    </Row>

                    <Row className='justify-content-center align-items-end footer'>
                        <p>Create your own room for <a href='/organizer/room'>FREE organization.com</a></p>
                    </Row>
                </Container>
            </div>
        </Fragment >
        
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Login);
