import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import classes from './Navbar.css';
import logo from '../../../assets/cti_logo.png';
import './Navbar.css';

const navbar = props => {
    let menuItems = (
        <Menu.Menu position="right">
            <Menu.Item>
                <Button positive onClick={(event)=> props.menuClicked(event, '/signup')}>Sign Up</Button>
            </Menu.Item>
            <Menu.Item>
                <Button onClick={(event)=> props.menuClicked(event, '/signin')}>Sign In</Button>
            </Menu.Item>
        </Menu.Menu>
    );

    if (props.isAuth){
        menuItems = (
            <Menu.Menu position="right">
                <Menu.Item active={props.pathname === '/booking'} className={classes.NavbarMenuItem}>
                    <Link to="/booking">Booking</Link>
                </Menu.Item>
          
                <Menu.Item active={props.pathname === '/tracking'} className={classes.NavbarMenuItem}>
                    <Link to="/tracking">Tracking</Link>
                </Menu.Item>

                <Menu.Item active={props.pathname === '/settings'} className={classes.NavbarMenuItem}>
                    <Link to="/settings">Settings</Link>
                </Menu.Item>

                <Menu.Item>
                    <Button color="google plus" onClick={(event) => props.menuClicked(event, '/signout')}>Sign Out</Button>
                </Menu.Item>
            </Menu.Menu>
        );
    }

    return (
        <Menu>
            <Menu.Menu className={classes.MenuItem}>
                <Menu.Item onClick={(event) => props.menuClicked(event, '/')}>
                    <img src={logo} className={classes.Logo} alt="logo" />
                </Menu.Item>
            </Menu.Menu>
            {menuItems}
        </Menu>
    );
};

navbar.propTypes = {
    menuClicked: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
};


export default navbar;