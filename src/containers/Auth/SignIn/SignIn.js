import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import classes from './SignIn.css';
import { Segment, Header, Icon } from 'semantic-ui-react';
import SignInForm from './SignInForm/SignInForm';

class SignIn extends Component {
    
    onSubmitHandler = (email, password) => {
        this.props.onAuth(email, password);
    };

    render(){
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return(
            <div className={classes.SignIn}>
            {authRedirect}
            <Segment raised>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='ship' circular color="blue" />
                    <Header.Content>
                        Sign In
                    </Header.Content>
                </Header>
                <SignInForm submitForm={this.onSubmitHandler} loading={this.props.loading} />
            </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authAgent.loading,
        authRedirectPath: state.authAgent.authRedirectPath,
        isAuthenticated: state.authAgent.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email,password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);