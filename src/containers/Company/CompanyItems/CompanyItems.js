import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Table } from 'semantic-ui-react';
import CompanyItemEdit from '../CompanyItemEdit/CompanyItemEdit';

const companyItems = props => {
    if (!props.items){
        return (
            <Table.Row>
                <Table.Cell colSpan='4'>
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                </Table.Cell>
            </Table.Row>
        );
    }

    let rows = props.items.map((cmp,index) => {
        return (
        <CompanyItemEdit 
            key={cmp.CmpID} 
            data={cmp} />
        );
    });
    return rows;
};

companyItems.propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array
};

export default companyItems;