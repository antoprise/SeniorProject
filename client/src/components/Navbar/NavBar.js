import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import {logout} from "../../actions/authActions" ;
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import piclogout from '../../assets/leave-white.svg';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {
    auth: { user },
    logout
  } = props;
  return (
    <div>
      <Navbar light expand="md"  className='navorg-section pt-0 pb-0'>
        <NavbarBrand href="/"><img src={Logo} style={{ width: '138px', height: '61px' }}></img></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to={"/room"} className='nav-item'> Room  </Link>
            </NavItem>
            <NavItem>
              <Link to={"/organizer/room"} className='nav-item'>ORGANIZER ROOM</Link>
            </NavItem>
            </Nav>
            {user ? (
              <Nav className="navbar-nav">
                <NavItem className="">
                  <NavbarText className="nav-user" style={{color:"white"}}>Hi, {user.userName}</NavbarText>
                </NavItem>
                <NavItem>
                  <Button onClick={logout}>
                    <img src={piclogout} width="15px" height="15px"></img>
                  </Button>
                </NavItem>
              </Nav>):(
              <Nav className="navbar-nav">
                <NavItem className="">
                  {/* <NavbarText className="nav-user" style={{color:"white"}}> Login </NavbarText> */}
                </NavItem>
                <NavItem>
                  {/* <Button onClick={logout}>
                    <img src={piclogout} width="15px" height="15px"></img>
                  </Button> */}
                </NavItem>
            </Nav>
            )}
            
        </Collapse>
      </Navbar>
  
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logout})(NavBar);