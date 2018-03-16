import React, { Component } from 'react';

class NotFound extends Component {
    render(){
        return <h2>404 Page Not Found.</h2>;
        // return !this.props.isAuthenticated? <Redirect to="/signin" /> : <h2>404 Page Not Found.</h2>;
    }
};

export default NotFound;