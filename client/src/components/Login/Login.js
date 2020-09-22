<<<<<<< Updated upstream
import React, { useEffect, Fragment } from 'react';
import logo from '../../assets/logo.svg';
import googlelogin from '../../assets/signin.svg';
import { Container, Row, Col } from 'reactstrap';


const Login = () => {
    return (
        <Fragment>
            <div className='bg fullscreen'>
                <Container >
                    <Row className='justify-content-center align-items-center logo'>
                        <img src={logo} alt='Interask' className='img-fluid '></img>
                    </Row>

                    <Row className='justify-content-center align-items-center button'>
                        <a href="/api/auth/google"><img src={googlelogin} alt='Interask' className='img-fluid' style={{width:'340px'}} /></a>
                    </Row>

                    <Row className='justify-content-center align-items-end footer'>
                        <p>Create your own room for <a href='/organizer'>FREE organization.com</a></p>
                    </Row>

                </Container>
            </div>
        </Fragment >
        
    );
};


export default Login;
=======
import React, { Fragment } from 'react';
import logo from '../../assets/logo.svg';
import googlelogin from '../../assets/signin.svg';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import apiUrl from '../../utils/apiUrl' ;
import { Redirect } from 'react-router-dom';

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
                        <a href={`${apiUrl}/api/auth/google`}><img src={googlelogin} alt='Interask' className='img-fluid' style={{width:'340px'}} /></a>
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
>>>>>>> Stashed changes
