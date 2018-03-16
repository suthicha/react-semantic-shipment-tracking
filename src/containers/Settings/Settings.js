import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Divider } from 'semantic-ui-react';
import classes from './Settings.css';
import SignUpForm from '../../components/Form/SignUpForm/SignUpForm';
import Company from '../Company/Company';
import * as actions from '../../store/actions/index';

class Settings extends Component {

    componentDidMount() {
        this.props.onLoadSetting();
    };

    onSubmitFormHandler = (data) => {
        this.props.onUpdateUser(data);
    };

    onDeleteItemCompleted = () => {
        console.log('[Settings]', 'onDeleteItemCompleted')
    };

    onItemValueChange = (data) => {
        console.log('[Settings]', data);
    };

    render(){
        
        return (
            <div className={classes.Settings}>
                <Segment>
                    <div className={classes.Header}>
                        <Header as='h2' icon >
                            <Icon name='settings' color='blue' />
                            Account Settings
                            <Header.Subheader>
                                Manage your account settings and set company preferences.
                            </Header.Subheader>
                        </Header>
                        <SignUpForm 
                            isUpdate={true} 
                            loading={this.props.saving}
                            user={this.props.user}
                            statusText={this.props.isSuccess?"update successfully.":null}
                            submitForm={this.onSubmitFormHandler} />
                    </div>
                </Segment>
                <Segment>
                    <div className={classes.Header}>
                        <Header as='h4'>
                            Your company
                            <Divider />
                        </Header>
                        <Company 
                        data={this.props.company} 
                        deleteItemCompleted={this.onDeleteItemCompleted}
                        itemValueChanged={this.onItemValueChange}
                        />
                    </div>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.settingAgent.user,
        company: state.settingAgent.company,
        error: state.settingAgent.error,
        loading: state.settingAgent.loading,
        saving: state.userAgent.loading,
        isSuccess: state.userAgent.isSuccess,
        updateError: state.userAgent.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadSetting: () => dispatch(actions.loadSetting()),
        onUpdateUser: (user) => dispatch(actions.updateUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);