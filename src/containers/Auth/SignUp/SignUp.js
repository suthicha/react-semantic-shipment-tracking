import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignUpForm from '../../../components/Form/SignUpForm/SignUpForm';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';
import classes from './SignUp.css';
import * as actions from '../../../store/actions/index';

class SignUp extends Component {
   
    onSubmitHandler = (data) => {     
        this.props.onRegister(data);
    };

    render(){
        const signupFormClasses = this.props.isSuccess? classes.RegisterSuccess: null;

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
}

const mapStateToProps = state => {
    return {
        loading: state.signupAgent.loading,
        isSuccess: state.signupAgent.isSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (user) => dispatch(actions.register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);