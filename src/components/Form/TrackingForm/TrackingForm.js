import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import Notifications from 'react-notification-system-redux';
import Aux from '../../../hoc/Aux/Aux';
import * as actions from '../../../store/actions/index';

class TrackingForm extends Component {

    state = {
        searchValue: '',
        hasError: false,
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ searchValue: event.target.value });
    };

    submitHandler = () => {
        const { location } = this.props
        if (location.pathname !== '/tracking'){
            this.props.history.push('/tracking');
        }

        if (this.state.searchValue === ""){
            this.setState({hasError: true });
            this.context.store.dispatch(actions.warningAlert('Tracking','Please enter your information.', 'tr'));
            return;
        };
        this.props.onTracking(this.state.searchValue);
        this.setState({hasError: false});
    };

    render() {
        return (
            <Aux>
                <Notifications notifications={this.props.notifications} />
                <Form onSubmit={this.submitHandler}>
                    <Form.Field>
                        <Input 
                            fluid
                            id="search"
                            error={this.state.hasError}
                            loading={this.props.loading}
                            value={this.state.searchValue}
                            onChange={this.onChangeHandler} 
                            action={{ type: 'submit', content: this.props.loading?'Checking':'Tracking' }} 
                            placeholder='Tracking...' />
                    </Form.Field>
                </Form>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.trackingAgent.loading,
        notifications: state.notifications
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTracking: (refno) => dispatch(actions.tracking(refno))
    }
};

TrackingForm.contextTypes = {
    store: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackingForm));