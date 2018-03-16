import React, {Component} from 'react';
import { Header, Container, Form, Button, Icon } from 'semantic-ui-react';
import { formatDateToString } from '../../../shared/utility';
import classes from './JobSearchBar.css'

class JobSearchBar extends Component {
    state = {
        etd: null,
        reference: ''
    };

    componentWillMount(){
        const curdate = new Date();
        this.setState({
            etd: formatDateToString(curdate,'-')
        });
    }

    datepickerValueChangedHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]:value});
    }

    inputChangedHandler = (event) => {
        event.preventDefault();
        const updateValue = event.target.value.toUpperCase();
        this.setState({reference: updateValue});
    }

    onSubmitHandler = () => {
        const searchParams = {
            etd: this.state.etd,
            reference: this.state.reference
        };
        this.props.clicked(searchParams);
    }

    render(){
        return (
            <Container className={classes.Container}>
                <Header as="h4">
                    <Icon name="search" /> ADVANCE SEARCH
                </Header>
                <Form 
                    size="tiny" 
                    onSubmit={this.onSubmitHandler}>
                    <Form.Group>
                        <Form.Field 
                            id="etd"
                            value={this.state.etd}
                            type="date" 
                            label='ETD' 
                            control='input' 
                            placeholder='' 
                            width={4}
                            onChange={(event) => this.datepickerValueChangedHandler(event)} />
                        <Form.Field 
                            id="reference"
                            label='REFERENCE' 
                            control='input' 
                            placeholder='Reference' 
                            width={12}
                            className={classes.UpperCase}
                            value={this.state.reference}
                            onChange={(event) => this.inputChangedHandler(event)} />
                    </Form.Group>
                    <Button 
                        color="twitter" 
                        type="submit" 
                        loading={this.props.loading}
                        disabled={this.props.loading}>Search</Button>
                </Form>
            </Container>
        )
    }
}

export default JobSearchBar;