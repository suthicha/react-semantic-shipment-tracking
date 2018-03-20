import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Icon } from 'semantic-ui-react';
import CompanyItems from './CompanyItems/CompanyItems';
import * as actions from '../../store/actions/index';
import classes from './Company.css';
import Aux from '../../hoc/Aux/Aux';
import Notifications from 'react-notification-system-redux';

class Company extends Component {
    
    componentDidMount(){
        this.props.onFetchCompany();
    };

    
    render(){
        const {notifications} = this.props;
        return(
            <Aux>
                <Notifications notifications={notifications} />
                <Table color={'red'} celled selectable className={classes.Table}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className={classes.HeaderCell}>Remove</Table.HeaderCell>                         
                            <Table.HeaderCell className={classes.HeaderCell}>TaxNo</Table.HeaderCell> 
                            <Table.HeaderCell className={classes.HeaderCell}>Branch</Table.HeaderCell> 
                            <Table.HeaderCell colSpan="2" className={classes.HeaderCell}>Name</Table.HeaderCell> 
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                            <CompanyItems items={this.props.company} />
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Button 
                                    icon 
                                    positive
                                    floated='left' 
                                    labelPosition='left' 
                                    size='small' 
                                    className={classes.Button}
                                    onClick={()=> this.props.onAddCompanyItem()}>
                                        <Icon name='add' />New
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        notifications: state.notifications,
        loading: state.companyAgent.loading,
        company: state.companyAgent.company,
        error: state.companyAgent.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCompany: () => dispatch(actions.fetchCompany()),
        onAddCompanyItem: () => dispatch(actions.addCompanyItem())
    }
};

Company.propTypes = {
    deleteItemCompleted: PropTypes.func,
    itemValueChanged: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
