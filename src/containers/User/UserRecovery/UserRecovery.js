import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Input, Button } from 'semantic-ui-react';
import classes from './UserRecovery.css';

class UserRecovery extends Component {
    state = {
        password: "",
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({password: event.target.value});
    };

    onClickResetPasswordHandler = () => {
        this.props.clickResetPassword(this.state.password);
    }

    render() {
        const validatePassword = this.state.password.length < 6;
        return (
            <Message color="orange">
                <Message.Header>User Account Recovery</Message.Header>
                    Enter new password: 
                    <Input 
                        action
                        type="text" 
                        size="mini" 
                        className={classes.ResetPassword}>
                        <input 
                            id="password" 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.onChangeHandler} />
                        <Button 
                            type='submit' 
                            color="orange" 
                            disabled={validatePassword} 
                            loading={this.props.loading}
                            onClick={this.onClickResetPasswordHandler}>Reset Password</Button>
                    </Input>
            </Message>
        );
    }
}

UserRecovery.propTypes = {
    clickResetPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        loading: state.userAgent.resetPasswordProcessing
    }
}

export default connect(mapStateToProps)(UserRecovery);