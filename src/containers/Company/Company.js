import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon } from 'semantic-ui-react';
import classes from './Company.css';
import CompanyItems from './CompanyItems/CompanyItems';

class Company extends Component {

    onDeleteItem = () => {

    };

    onUpdateItem = (data) => {

    };

    render(){
        return(
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
                    <CompanyItems 
                        items={this.props.data} 
                        deleteItemCompleted={this.onDeleteItem}
                        itemValueChanged={this.onUpdateItem} />
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='add' /> Add Company
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
};

Company.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array,
    deleteItemCompleted: PropTypes.func,
    itemValueChanged: PropTypes.func,
};

Company.defaultProps = {
    loading: false,
}

export default Company;