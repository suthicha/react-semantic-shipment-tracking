import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Table, Input, Checkbox } from 'semantic-ui-react';
import * as stateType from '../../../store/actions/stateType';
import classes from './CompanyItemEdit.css';
import * as actions from '../../../store/actions/index';

class CompanyItemEdit extends Component {
    
    state = {
        taxno: '',
        branch: '',
        name: '',
        isEdit: false,
        isDelete: false,
        hasError: false
    };

    componentDidMount(){
        if (this.props.data){
            this.setState({
                taxno: this.props.data.CmpTaxNo,
                branch: this.props.data.CmpBranch,
                name: this.props.data.CmpName,
                isEdit: this.props.data.ItemType? true: false
            });
        }
       
    };

    componentWillReceiveProps(nextProps){
        
        if(nextProps.data){
            if (nextProps.data.error && !this.props.data.error){
                this.setState({isEdit: true, hasError: true})
            }
            if (nextProps.data.triggerValue){
                this.setState({
                    taxno: nextProps.data.CmpTaxNo,
                    branch: nextProps.data.CmpBranch,
                    name: nextProps.data.CmpName,
                    hasError: false
                });
            }
        }
        
    };

    onChangeHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]: value.toUpperCase() });
    };

    onSwitchModeHandler = () => {
        this.setState({isEdit: !this.state.isEdit})
    };

    onItemStateChangeHandler = (statetype) => {
        const data = {
            idValue: this.props.data.CmpID,
            taxnoValue: this.state.taxno,
            branchValue: this.state.branch,
            nameValue: this.state.name,
            itemType: this.props.data.ItemType
        }
        
        switch(statetype){
            case stateType.STATE_INSERT: this.props.onInsertCompany(data); break;
            case stateType.STATE_UPDATE: this.props.onUpdateCompany(data); break;
            case stateType.STATE_DELETE: this.props.onDeleteCompany(data); break;
            default:
                break;
        }

        this.setState({isEdit: false, hasError: false});
    };
    
    onClickSaveHandler = () => {
        const statetype = this.props.data.ItemType
            ? stateType.STATE_INSERT
            : stateType.STATE_UPDATE;
        
        this.onItemStateChangeHandler(statetype);
    };

    onClickDeleteHandler = () => {
        this.onItemStateChangeHandler(stateType.STATE_DELETE);
    };

    onClickCancelHandler = () => {
        this.setState({
            isEdit: false,
            isDelete: false
        });

        if (this.props.data.error || this.props.data.ItemType){
            const refkey = this.props.data.RefKey;
            this.props.onTryFetchCompany(refkey);
        }
    };

    toggleCheckboxHandler = (event, data) => {
        event.preventDefault();
        this.setState({isDelete: data.checked});
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
                    <Button 
                        color='google plus' 
                        loading={this.props.loading}
                        onClick={this.onClickDeleteHandler}>Delete</Button>
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
                            error={this.state.hasError}
                            value={this.state.taxno}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={2}>
                        <Input 
                            id="branch"
                            size="mini" 
                            fluid={true}
                            error={this.state.hasError}
                            value={this.state.branch}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={8}>
                        <Input 
                            id="name"
                            size="mini" 
                            fluid={true}
                            error={this.state.hasError}
                            value={this.state.name}
                            onChange={this.onChangeHandler} />
                    </Table.Cell>  
                    <Table.Cell width={2}>
                        <Button.Group size="small">
                            <Button onClick={this.onClickCancelHandler}>Cancel</Button>
                            <Button.Or />
                            <Button 
                                positive 
                                loading={this.props.loading}
                                onClick={this.onClickSaveHandler}>Save</Button>
                        </Button.Group>
                    </Table.Cell>
                </Table.Row>
            );
        };

        return row;
    }
};

CompanyItemEdit.propTypes = {
    data: PropTypes.object
};

const mapStateToProps = state => {
    return {
        loading: state.companyAgent.loading,
        error: state.companyAgent.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryFetchCompany: (refkey) => dispatch(actions.fetchCompanyFromCache(refkey)),
        onUpdateCompany: (company) => dispatch(actions.updateCompany(company)),
        onDeleteCompany: (company) => dispatch(actions.deleteCompany(company)),
        onInsertCompany: (company) => dispatch(actions.insertCompany(company))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyItemEdit);