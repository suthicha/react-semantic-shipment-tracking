import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import classes from './TrackingSearchBar.css';

class TrackingSearchBar extends Component {
    state = { search: "" }

    inputChangedHandler = event => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]: value.toUpperCase()})
    }

    onSubmitHandler = () => {
        this.props.clicked(this.state.search);
    }

    render(){
        return (
            <Container className={classes.Container}>
                <Form size="tiny" onSubmit={this.onSubmitHandler}>
                    <Form.Field 
                        id="search"
                        value={this.state.search}
                        label='Your reference' 
                        control='input' 
                        placeholder='' 
                        width={16}
                        className={classes.UpperCase}
                        onChange={(event) => this.inputChangedHandler(event)} />
                    <Button 
                        color="twitter" 
                        type="submit" 
                        loading={this.props.loading}
                        disabled={this.props.loading}>Search</Button>
                </Form>
            </Container>
        );
    }
}

export default TrackingSearchBar;