import React, { Component } from 'react';
import PropTypes from "prop-types";
import { 
    Button, 
    Form, 
    Input, 
    Divider, 
    Dimmer,
    Loader
} from 'semantic-ui-react';
import classes from './SignUpForm.css';

class SignUpForm extends Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        username: '',
        error: null,
        open: true
    };

    componentWillReceiveProps(nextProps){
        
        if (nextProps.isUpdate && nextProps.user){
            this.setState({
                email: nextProps.user.Email,
                firstname: nextProps.user.FirstName,
                lastname: nextProps.user.LastName,
                phone: nextProps.user.PhoneNO,
                username: nextProps.user.LoginName
            })
        }
    };

    inputChangedHandler = (event) => {
        event.preventDefault();        
        const { id, value } = event.target;
        this.setState({[id]:value});
    }

    onSubmitHandler = () => {
        const { email, firstname, lastname, phone, username, password } = this.state;
        const data = {
            Email: email,
            FirstName: firstname,
            LastName: lastname,
            PhoneNO: phone,
            LoginName: username,
            Password: password
        }

        this.props.submitForm(data);
    }

    render(){

        const accountClasse = this.props.isUpdate? classes.visible: null;
        
        const { 
            firstname,
            lastname,
            email,
            phone,
            username
        } = this.state;
       
        let form = (
            <Dimmer active inverted>
                <Loader>Loading</Loader>
            </Dimmer>
        );

        form = (
            <Form onSubmit={this.onSubmitHandler}>
                <h4>Information</h4>
                <Divider />
                <Form.Group widths="equal">
                    <Form.Field 
                        control={Input} 
                        id="firstname" 
                        label="First name" 
                        placeholder="First name" 
                        required
                        value={firstname} 
                        onChange={this.inputChangedHandler} />
                    <Form.Field 
                        control={Input} 
                        id="lastname" 
                        label="Last name" 
                        placeholder="Last name" 
                        value={lastname}
                        onChange={this.inputChangedHandler} />
                </Form.Group>
                <Form.Field 
                    control={Input} 
                    id="email" 
                    type="email" 
                    label="Email" 
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={this.inputChangedHandler} />
                <Form.Field 
                    control={Input} 
                    id="phone" 
                    label="Phone" 
                    placeholder="Phone" 
                    value={phone}
                    onChange={this.inputChangedHandler} />
                <div className={accountClasse}>
                <h4>Account</h4>
                <Divider />
                <Form.Group widths="equal">
                    <Form.Field 
                        control={Input} 
                        id="username" 
                        type="email" 
                        label="Account name" 
                        placeholder="Enter your account name" 
                        value={username}
                        required
                        disabled={this.props.isUpdate}
                        onChange={this.inputChangedHandler} />
                    <Form.Field 
                        control={Input} 
                        id="password" 
                        type="password" 
                        label="Password" 
                        placeholder="Enter your password" 
                        required
                        disabled={this.props.isUpdate}
                        onChange={this.inputChangedHandler} />
                </Form.Group>
                </div>
                <div>
                    <Button type="submit" primary loading={this.props.loading}>
                    {
                        this.props.isUpdate
                        ? "Update"
                        : "Register"
                    }
                    </Button>
                    { this.props.statusText }
                </div>
            </Form>
            );
        
        return form;
    }
}

SignUpForm.propTypes = {
    isUpdate: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    statusText: PropTypes.string,
    user: PropTypes.object,
}

SignUpForm.defaultProps = {
    isUpdate: false,
    loading: false,
}

export default SignUpForm;