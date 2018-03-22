import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Table, Button, Divider, Icon } from 'semantic-ui-react';
import UserList from './UserList/UserList';
import classes from './User.css';
import * as actions from '../../store/actions/index';
import Notifications from 'react-notification-system-redux';

class User extends Component {
    
    componentDidMount(){
        this.props.onSelectUsers();
    }

    render() {
        const { users } = this.props;

        const hasNewRow = () => {
            if (users){
                return users.filter(q => q.ItemType === 'NEW').length > 0;
            } else {
                return false;
            }
        };

        return (
            <div className={classes.User}>
                <Notifications notifications={this.props.notifications} />
                <Segment>
                    <div className={classes.Header}>
                        <Header as='h4'>
                            <Icon name="users" />Users list
                        </Header>
                        <Divider className={classes.Divider} />
                        <Table color={'red'} celled selectable className={classes.Table}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className={classes.HeaderCell}>Remove</Table.HeaderCell>                         
                                <Table.HeaderCell className={classes.HeaderCell}>LoginName</Table.HeaderCell> 
                                <Table.HeaderCell className={classes.HeaderCell}>FirstName</Table.HeaderCell> 
                                <Table.HeaderCell className={classes.HeaderCell}>LastName</Table.HeaderCell> 
                                <Table.HeaderCell className={classes.HeaderCell}>Email</Table.HeaderCell> 
                                <Table.HeaderCell className={classes.HeaderCell}>Phone</Table.HeaderCell> 
                                <Table.HeaderCell className={classes.HeaderCell}>Group</Table.HeaderCell> 
                                <Table.HeaderCell colSpan="2" className={classes.HeaderCell}>Register</Table.HeaderCell> 
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <UserList users={this.props.users} loading={this.props.loading} />   
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='10'>
                                    <Button 
                                        icon
                                        floated='left' 
                                        labelPosition='left' 
                                        size='small' 
                                        color={hasNewRow()?"grey":"green"}
                                        className={classes.Button}
                                        disabled={hasNewRow()}
                                        onClick={()=> this.props.onAddUserItem()}>
                                            <Icon name='add' />New
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    </div>
                </Segment>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
        users: state.userAgent.users,
        loading: state.userAgent.loading,
    }
};

const mapDistpatchToProps = dispatch => {
    return {
        onSelectUsers: () => dispatch(actions.selectUsers()),
        onAddUserItem: () => dispatch(actions.addUserItem())
    }
};

export default connect(mapStateToProps, mapDistpatchToProps)(User);
