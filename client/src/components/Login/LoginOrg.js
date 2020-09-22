import React, { Fragment } from 'react';
import logo from '../../assets/logo.svg';
import googlelogin from '../../assets/signin.svg';
import { Container, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';
import apiUrl from '../../utils/apiUrl' ;
import { Redirect } from 'react-router-dom';

const LoginOrg = (props) => {
    const {
        isAuthenticated
    } = props

    if (isAuthenticated) {
        return <Redirect to='/organizer/room' />;
    }

    return (
        <Fragment>
            <div className='bg fullscreen'>
            <Container className=''>
                <Row className='justify-content-center align-items-center '>
                    <img src={logo} alt='Interask' className='img-fluid '></img>
                </Row>

                <Row className='justify-content-center align-items-center '>
                    <a href={`${apiUrl}/api/auth/google`}><img src={googlelogin} alt='Interask' className='img-fluid' style={{width:'350px' ,height:'87px'}} /></a>
                </Row>

                <Row className='justify-content-center align-items-end '>
                <Button className ='howto' color="dark" size="lg"  style={{width:'226px' , height:'55px'}} >How to</Button>
                </Row>
                <Row className='justify-content-center align-items-end footer'>
                        <p>Swap to user <a href='/room'>ask.com</a></p>
                </Row>
            </Container>
            </div>
        </Fragment >
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LoginOrg);
