import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Table, Input, Checkbox } from 'semantic-ui-react';
import classes from './CompanyItemEdit.css';

class CompanyItemEdit extends Component {
    
    state = {
        taxno: '',
        branch: '',
        name: '',
        isEdit: false,
        isDelete: false
    };

    componentDidMount(){
        this.setState({
            taxno: this.props.data.CmpTaxNo,
            branch: this.props.data.CmpBranch,
            name: this.props.data.CmpName
        });
    };

    onChangeHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]: value });
    };

    onSwitchModeHandler = () => {
        this.setState({isEdit: !this.state.isEdit})
    };

    onClickSaveHandler = () => {
        const data = {
            taxNoValue: this.state.taxno,
            branchValue: this.state.branch,
            nameValue: this.state.name
        }
        this.props.itemValueChanged(data);
        this.setState({isEdit: false});
    };

    onClickCancelHandler = () => {
        this.setState({
            isEdit: false,
            isDelete: false
        });
    };

    toggleCheckboxHandler = (event, data) => {
        event.preventDefault();
        this.setState({isDelete: data.checked});
    };

    onClickDeleteHandler = () => {
        console.log('onClickDeleteHandler', 'Delete');
        this.props.deleteCompleteEvent();
    };

    render() {

        let btnCell = (
            <Button 
                floated='right' 
                icon 
                labelPosition='left' 
                color='google plus' 
                size='small'
                onClick={this.onSwitchModeHandler}>
                <Icon name='edit' /> Edit
            </Button>
        );

        if (this.state.isDelete){
            btnCell = (
                <Button.Group size="small">
                    <Button onClick={this.onClickCancelHandler}>Cancel</Button>
                    <Button.Or />
                    <Button color='google plus' onClick={this.onClickDeleteHandler}>Delete</Button>
                </Button.Group>
            );
        };

        let row = (
            <Table.Row className={classes.Row}>
                <Table.Cell width={1}>
                    <Checkbox toggle 
                    checked={this.state.isDelete}
                    onChange={this.toggleCheckboxHandler} />
                </Table.Cell>
                <Table.Cell width={3} className={classes.Cell}>{this.state.taxno}</Table.Cell>  
                <Table.Cell width={2} className={classes.Cell}>{this.state.branch}</Table.Cell>  
                <Table.Cell width={8} className={classes.Cell}>
                    {this.state.name}
                </Table.Cell>
                <Table.Cell width={2} className={classes.Cell}>
                    {btnCell}
                </Table.Cell>
            </Table.Row>
        );

        if (this.state.isEdit){
            row = (
                <Table.Row>
                    <Table.Cell width={1}>
                        <Checkbox toggle 
                        size='mini'
                        disabled={true}
                        checked={this.state.isDelete}
                        onChange={this.toggleCheckboxHandler} />
                    </Table.Cell>
                    <Table.Cell width={3}>
                        <Input
                            focus
                            id="taxno" 
                            size="mini" 
                            fluid={true} 
                            value={this.state.taxno}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={2}>
                        <Input 
                            id="branch"
                            size="mini" 
                            fluid={true}
                            value={this.state.branch}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={8}>
                        <Input 
                            id="name"
                            size="mini" 
                            fluid={true}
                            value={this.state.name}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={2}>
                        <Button.Group size="small">
                            <Button onClick={this.onClickCancelHandler}>Cancel</Button>
                            <Button.Or />
                            <Button positive onClick={this.onClickSaveHandler}>Save</Button>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        }
        return row;
    }
};

CompanyItemEdit.propTypes = {
    data: PropTypes.object,
    deleteCompleteEvent: PropTypes.func,
    itemValueChanged: PropTypes.func,
};

export default CompanyItemEdit;