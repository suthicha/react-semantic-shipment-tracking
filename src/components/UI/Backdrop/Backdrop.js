import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}><Dimmer active><Loader>{props.title}...</Loader></Dimmer></div> : null
);

backdrop.propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func,
};

export default backdrop;