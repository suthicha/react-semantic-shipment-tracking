import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Divider, Button } from 'semantic-ui-react';

class NewUser extends Component {
    state = {
        UserID: 0,
        LoginName: '',
        Password: '',
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNO: '',
        UserGroupID: 1,
        hasError: false
    }

    getData = () => {
        return this.state;
    };

    bindPropsToState = () => {
        var dbStore = this.props.data;
        var propKeys = Object.keys(dbStore);
        var stateKeys = Object.keys(this.state);

        propKeys.forEach(element => {
            const stateName = stateKeys.find(
                q => q.toLowerCase() === element.toLocaleLowerCase());
            if (stateName){
                this.setState({[stateName]:dbStore[element]});
            }
        });
    };

    componentDidMount(){
        if (this.props.data){
            this.bindPropsToState();
            this.setState({
                hasError: this.props.data.error? true: false
            })
        }
    };

    inputChangedHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]: value});
    };

    render(){
        return (
            <Form onSubmit={this.props.clickSaveNewItem} error={this.state.hasError}>
                <Form.Group widths="equal">
                    <Form.Field 
                        control={Input} 
                        id="FirstName" 
                        label="First name" 
                        placeholder="First name" 
                        required
                        value={this.state.FirstName} 
                        error={this.state.hasError}
                        onChange={this.inputChangedHandler} />
                    <Form.Field 
                        control={Input} 
                        id="LastName" 
                        label="Last name" 
                        placeholder="Last name" 
                        value={this.state.LastName}
                        error={this.state.hasError}
                        onChange={this.inputChangedHandler} />
                </Form.Group>
                <Form.Field 
                    control={Input} 
                    id="Email" 
                    type="email" 
                    label="Email" 
                    placeholder="Email" 
                    required
                    value={this.state.Email}
                    error={this.state.hasError}
                    onChange={this.inputChangedHandler} />
                <Form.Field 
                    control={Input} 
                    id="PhoneNO" 
                    label="Phone" 
                    placeholder="Phone" 
                    value={this.state.PhoneNO}
                    error={this.state.hasError}
                    onChange={this.inputChangedHandler} />
                <div>
                <h4>Account</h4>
                <Divider />
                <Form.Group widths="equal">
                    <Form.Field 
                        control={Input} 
                        id="LoginName" 
                        type="email" 
                        label="Account name" 
                        placeholder="Enter your account name" 
                        value={this.state.LoginName}
                        error={this.state.hasError}
                        required
                        onChange={this.inputChangedHandler} />
                    <Form.Field 
                        control={Input} 
                        id="Password" 
                        type="password" 
                        label="Password" 
                        placeholder="Enter your password" 
                        required
                        value={this.state.Password}
                        error={this.state.hasError}
                        onChange={this.inputChangedHandler} />
                </Form.Group>
                </div>
                <div>
                    <Button.Group size="small" floated="right" >
                    <Button type="button" onClick={this.props.clickCancel}>Cancel</Button>
                    <Button.Or />
                    <Button 
                        positive 
                        loading={this.props.loading}
                        type="submit">Save</Button>
                    </Button.Group>
                </div>
            </Form>
        )
    }
};


NewUser.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object.isRequired,
    clickCancel: PropTypes.func.isRequired,
    clickSaveNewItem: PropTypes.func.isRequired,
}

export default NewUser;