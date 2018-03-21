import React from 'react';
import PropTypes from 'prop-types';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import UserItemEdit from '../UserItemEdit/UserItemEdit';

const userList = props => {
    if (!props.users){
        return (
            <Table.Row>
                <Table.Cell colSpan='10'>
                <Dimmer active inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
                </Table.Cell>
            </Table.Row>
        );
    }

    let rows = props.users.map((usr) => {
        return <UserItemEdit key={usr.UserID} data={usr} />;
    });

    return rows;
};

userList.propTypes = {
    users: PropTypes.array
}

userList.defaultProps = {
    users: null,
}

export default userList;