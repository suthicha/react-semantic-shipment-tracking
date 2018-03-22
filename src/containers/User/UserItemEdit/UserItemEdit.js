import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Table, Input, Checkbox, Dropdown } from 'semantic-ui-react';
import classes from './UserItemEdit.css';
import * as actions from '../../../store/actions/index';
import * as stateType from '../../../store/actions/stateType';
// import { warningAlert } from '../../../store/actions/notificationAction';
import Aux from '../../../hoc/Aux/Aux';
import UserRecovery from '../UserRecovery/UserRecovery';
import NewUser from '../NewUser/NewUser';

const usergroupOptions = [
    {text: 'User', value: 1},
    {text: 'Operation', value: 2},
    {text: 'Admin', value: 9},
];

class UserItemEdit extends Component {

    state = {
        userId: 0,
        loginName: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        usergroupId: 1,
        registerDate: null,
        isEdit: false,
        isNewRow: false,
        isDelete: false,
        hasError: false,
    };

    onChangeHandler = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({[id]: value.toUpperCase() });
    };

    onSwitchModeHandler = () => {
        this.setState({isEdit: !this.state.isEdit})
    };

    toggleCheckboxHandler = (event, data) => {
        event.preventDefault();
        this.setState({isDelete: data.checked});
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


    onItemStateChangeHandler = (statetype, refData) => {

        const data = {
            UserID: this.props.data.UserID,
            LoginName: this.state.loginName,
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Email: this.state.email,
            PhoneNO: this.state.phoneNo,
            UserGroupID: this.state.usergroupId? this.state.usergroupId : 1,
            itemType: this.props.data.ItemType
        }
        
        switch(statetype){
            case stateType.STATE_INSERT: this.props.onInsertUserByRef(refData); break;
            case stateType.STATE_UPDATE: this.props.onUpdateUserByRef(data); break;
            case stateType.STATE_DELETE: this.props.onDeleteUserByRef(data); break;
            default:
                break;
        }

        // this.setState({isEdit: false, hasError: false});
    };


    onChnageDropdownHandler =(event, data) => {
        event.preventDefault();
        this.setState({usergroupId: data.value});
    };

    bindPropsToState = (refData) => {
        var dbStore = refData? refData : this.props.data;
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

    onClickCancelHandler = () => {

        if (this.state.isEdit){
            this.bindPropsToState();
        }

        this.setState({
            isEdit: false,
            isDelete: false
        });

        if (this.props.data.error || this.props.data.ItemType){
            const refkey = this.props.data.RefKey;
            this.props.onTryFetchCompany(refkey);
        }
    };

    onResetPasswordHandler = (newPassword) => {
        this.props.onResetUserPassword(this.state.userId, newPassword);
    };

    onClickSaveNewItemHandler = () => {
        const data = Object.assign({}, this._newUser.getData());
        this.onItemStateChangeHandler(stateType.STATE_INSERT, data);
    };

    componentDidMount(){
        if (this.props.data){
            this.bindPropsToState();
            this.setState({
                isEdit: this.props.data.ItemType? true: false,
                isNewRow: this.props.data.ItemType? true: false
            });
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            if (nextProps.data.error && !this.props.data.error){
                this.setState({isEdit: true, hasError: true})
            }
            if (nextProps.data.triggerValue){
                this.bindPropsToState(nextProps.data);
                this.setState({hasError: false });
            }
            if (nextProps.itemProcessing && nextProps.itemSuccess){
                this.setState({isEdit: false, hasError: false})                
            }
        }
    };

    render() {

        let btnCell = (
            <Button 
                floated='right' 
                icon 
                labelPosition='left' 
                color='orange' 
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
                        loading={this.props.itemProcessing}
                        onClick={this.onClickDeleteHandler}>Delete</Button>
                </Button.Group>
            );
        };

        let row = (
            <Table.Row className={classes.Row} error={this.state.isDelete}>
                <Table.Cell width={1}>
                    <Checkbox toggle 
                    checked={this.state.isDelete}
                    onChange={this.toggleCheckboxHandler} />
                </Table.Cell>
                <Table.Cell width={3} className={classes.Cell}>{this.state.loginName}</Table.Cell>  
                <Table.Cell width={2} className={classes.Cell}>{this.state.firstName}</Table.Cell>  
                <Table.Cell width={2} className={classes.Cell}>{this.state.lastName}</Table.Cell>  
                <Table.Cell width={3} className={classes.Cell}>{this.state.email}</Table.Cell>  
                <Table.Cell width={2} className={classes.Cell}>{this.state.phoneNo}</Table.Cell>  
                <Table.Cell width={1} className={classes.Cell}>{this.state.usergroupId}</Table.Cell>  
                <Table.Cell width={1} className={classes.Cell}>{this.state.registerDate}</Table.Cell>  
                
                <Table.Cell width={2} className={classes.Cell}>
                    {btnCell}
                </Table.Cell>

            </Table.Row>
        );

        if (this.state.isEdit) {
            if (this.state.isNewRow){
                const newRowClasses = [classes.Row, classes.NewRow];
                row = (
                    <Table.Row className={newRowClasses.join(' ')}>
                        <Table.Cell colSpan='9'>
                            <NewUser 
                                data={this.props.data} 
                                clickCancel={this.onClickCancelHandler}
                                clickSaveNewItem={this.onClickSaveNewItemHandler}
                                loading={this.props.itemProcessing}
                                ref={(ref)=> this._newUser = ref} />
                            
                        </Table.Cell>
                    </Table.Row>
                );
            }else {
                row = (
                    <Aux>
                        <Table.Row warning>
                            <Table.Cell width={1}>
                                <Checkbox toggle 
                                size='mini'
                                disabled={true}
                                checked={this.state.isDelete}
                                onChange={this.toggleCheckboxHandler} />
                            </Table.Cell>
                            <Table.Cell width={3} className={classes.Cell}>{this.state.loginName}</Table.Cell>  
                            
                            <Table.Cell width={2}>
                                <Input
                                    id="firstName" 
                                    size="small" 
                                    fluid={true} 
                                    error={this.state.hasError}
                                    value={this.state.firstName}
                                    onChange={this.onChangeHandler} />
                            </Table.Cell>   
                            <Table.Cell width={2}>
                                <Input
                                    id="lastName" 
                                    size="small" 
                                    fluid={true} 
                                    error={this.state.hasError}
                                    value={this.state.lastName}
                                    onChange={this.onChangeHandler} />
                            </Table.Cell>  
                            <Table.Cell width={3}>
                                <Input
                                    id="email" 
                                    size="small" 
                                    fluid={true} 
                                    error={this.state.hasError}
                                    value={this.state.email}
                                    onChange={this.onChangeHandler} />
                            </Table.Cell>  
                            <Table.Cell width={1}>
                                <Input
                                    id="phoneNo" 
                                    size="small" 
                                    fluid={true} 
                                    error={this.state.hasError}
                                    value={this.state.phoneNo}
                                    onChange={this.onChangeHandler} />
                            </Table.Cell>  
                            <Table.Cell width={2}>
                                <Dropdown  
                                    fluid 
                                    selection 
                                    size="small"
                                    value={this.state.usergroupId}
                                    onChange={this.onChnageDropdownHandler}
                                    options={usergroupOptions} />
                            </Table.Cell>  
                            <Table.Cell width={1} className={classes.Cell}>{this.state.registerDate}</Table.Cell>  
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
                        <Table.Row className={classes.Row}>
                            <Table.Cell colSpan='10'>
                                <UserRecovery clickResetPassword={this.onResetPasswordHandler} />
                            </Table.Cell>
                        </Table.Row>
                    </Aux>
                )
            }
        };

        return row;
    }
};

UserItemEdit.propTypes = {
    data: PropTypes.object
};

UserItemEdit.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => {
    return {
        loading: state.userAgent.loading,
        itemProcessing: state.userAgent.itemProcessing,
        itemSuccess: state.userAgent.isSuccess,
        itemError: state.userAgent.itemError,
        error: state.userAgent.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryFetchCompany: (refKey) => dispatch(actions.fetchUsersFromCache(refKey)),
        onResetUserPassword: (userId, password) => dispatch(actions.resetUserPassword(userId, password)),
        onUpdateUserByRef: (user) => dispatch(actions.updateUserByRef(user)),
        onDeleteUserByRef: (user) => dispatch(actions.deleteUserByRef(user)),
        onInsertUserByRef: (user) => dispatch(actions.insertUserByRef(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItemEdit);
