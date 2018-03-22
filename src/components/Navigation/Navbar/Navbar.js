import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu, Button, Icon } from 'semantic-ui-react';
import TrackingForm from '../../Form/TrackingForm/TrackingForm';
import classes from './Navbar.css';
import logo from '../../../assets/cti_logo.png';
import './Navbar.css';

const navbar = props => {
    let menuItemClasses = [classes.NavbarMenuItem];

    if (props.groupId < 2 || props.groupId !== 9){
        menuItemClasses = [classes.NavbarMenuItem, classes.Level];
    }

    let menuItems = (
        <Menu.Menu position="right">
            <Menu.Item className={classes.Item}>
                <Button icon positive onClick={(event)=> props.menuClicked(event, '/signup')} className={classes.Button}>
                <Icon name="podcast" size="large" />
                Register</Button>
            </Menu.Item>
            <Menu.Item className={classes.Item}>
                <Button icon onClick={(event)=> props.menuClicked(event, '/signin')} className={classes.Button} color="blue">
                <Icon name="user" size="large" />
                Sign In</Button>
            </Menu.Item>
        </Menu.Menu>
    );

    if (props.isAuth){
        menuItems = (
            <Menu.Menu position="right">
                <Menu.Item className={classes.NavbarMenuItemTracking}>
                    <TrackingForm />
                </Menu.Item>
                <Menu.Item active={props.pathname === '/booking'} className={menuItemClasses.join(' ')}>
                    <Link to="/booking">
                        <Icon name="unordered list" size="large" />
                    Booking</Link>
                </Menu.Item>
                <Menu.Item active={props.pathname === '/user'} className={menuItemClasses.join(' ')}>
                    <Link to="/users">
                    <Icon name="users" size="large" />
                    Users</Link>
                </Menu.Item>
                <Menu.Item active={props.pathname === '/settings'} className={classes.NavbarMenuItem}>
                    <Link to="/settings">
                        <Icon name="setting" size="large" />
                    Settings</Link>
                </Menu.Item>
                <Menu.Item>
                    <Button icon color="google plus" onClick={(event) => props.menuClicked(event, '/signout')} className={classes.Button}>
                    <Icon name="sign out" size="large" />
                    Sign Out</Button>
                </Menu.Item>
            </Menu.Menu>
        );
    }

    return (
        <Menu secondary className={classes.MainMenu}>
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