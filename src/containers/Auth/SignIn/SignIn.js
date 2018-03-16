import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
import classes from './SignIn.css';
import { 
    Button, 
    Checkbox, 
    Form, 
    Message, 
    Segment, 
    Header, 
    Icon
 } from 'semantic-ui-react';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        open: true,
        error: false
    };

    handleClose = () => this.setState({ open: true })
    
    inputChangedHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]:value});
    };

    checkboxClickHandler = (event) => {
        const { id, checked } = event.target;
        this.setState({[id]:checked});
    }

    onSubmitHandler = () => {

        setTimeout(()=>{
            const { email, password } = this.state;
            this.props.onAuth(email, password);
            this.setState({loading:false});
        },1000);

    }

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
                <Icon name='users' circular />
                <Header.Content>
                    Sign In
                </Header.Content>
            </Header>
            <Form 
                onSubmit={this.onSubmitHandler} 
                error={this.state.error}
                loading={this.props.loading}>
                <Form.Field required>
                    <label>Email</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder='Email' 
                        onChange={(event) => this.inputChangedHandler(event)}/>
                </Form.Field>
                <Form.Field required>
                    <label>Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder='Password' 
                        onChange={(event) => this.inputChangedHandler(event)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox 
                        id="remember" 
                        label='I agree to the Terms and Conditions'
                        onClick={(event) => this.checkboxClickHandler(event)} />
                </Form.Field>
                <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.' />
                <Button type='submit'>Submit</Button>
            </Form>
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