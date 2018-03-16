import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Aux from '../Aux/Aux';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import classes from './Layout.css';

class Layout extends Component {

    menuClickHandler = (event, pathname) => {
        event.preventDefault();
        this.props.history.push(pathname);
    }

    render(){
        return(
            <Aux>
                <Navbar 
                    pathname={this.props.pathname} 
                    isAuth={this.props.isAuth}
                    menuClicked={this.menuClickHandler} />
                <div className={classes.Content}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

Layout.propTypes = {
    pathname: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired,
};

Layout.defaultProps = {
    isAuth: false,
}

export default withRouter(Layout);