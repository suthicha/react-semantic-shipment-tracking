import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const header = props => (
    <Header as='h4'>{props.title}
        <Header.Subheader>{props.content}</Header.Subheader>
    </Header>
);


header.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
};

export default header;