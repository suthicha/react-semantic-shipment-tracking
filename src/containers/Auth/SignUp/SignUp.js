import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';
import SignUpForm from '../../../components/Form/SignUpForm/SignUpForm';
import classes from './SignUp.css';
import * as actions from '../../../store/actions/index';
import * as actionType from '../../../store/actions/actionTypes';

import Notifications from 'react-notification-system-redux';

class SignUp extends Component {
   
    componentDidMount(){
        this.context.store.dispatch({ type: actionType.SIGNUP_INIT });
    };

    onSubmitHandler = (data) => {     
        this.props.onRegister(data);
    };

    render(){
        const signupFormClasses = this.props.isSuccess? classes.RegisterSuccess: null;
        const { notifications } = this.props;

        let title = "Register Form";

        if (this.props.isSuccess){
            title = (
                <div>
                    <h2 className={classes.Title}>Register Successfully :) </h2>
                    <Link to="/signin" className={classes.Link}>Click to signin.</Link>
                </div>
            );
        }

        return (
            <Container className={classes.Container}>
                <Notifications notifications={notifications} />
                <Segment raised>
                    <div className={classes.SignUp}>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='users' circular />
                            <Header.Content className={signupFormClasses}>
                                {title}
                            </Header.Content>
                        </Header>
                        <div className={signupFormClasses}>
                            <SignUpForm 
                                isUpdate={false} 
                                loading={this.props.loading}
                                submitForm={this.onSubmitHandler} />
                        </div>
                    </div>
                </Segment>
            </Container>
        );
    }
};

SignUp.contextTypes = {
    store: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        loading: state.signupAgent.loading,
        isSuccess: state.signupAgent.isSuccess,
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (user) => dispatch(actions.register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);