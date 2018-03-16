import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import NotFound from './containers/NotFound/NotFound';
import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute';

const asyncDashboard = asyncComponent(() => {
  return import('./containers/Dashboard/Dashboard');
});

const asyncSignIn = asyncComponent(() => {
  return import('./containers/Auth/SignIn/SignIn');
});

const asyncSignUp = asyncComponent(() => {
  return import('./containers/Auth/SignUp/SignUp');
});

const asyncSignOut = asyncComponent(() => {
  return import('./containers/Auth/SignOut/SignOut');
});

const asyncTracking = asyncComponent(() => {
  return import('./containers/Tracking/Tracking');
});

const asyncSettings = asyncComponent(() => {
  return import('./containers/Settings/Settings');
});

const asyncJob = asyncComponent(() => {
  return import('./containers/Job/Job');
});


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  };

  render() {

    let routes = (
      <Switch>
          <Route path="/signin" component={asyncSignIn}/>    
          <Route path="/signup" component={asyncSignUp}/>  
          <Route path="/signout" component={asyncSignOut}/>  
          <Route path="/" exact component={asyncDashboard}/>
          <ProtectedRoute isAccessible={this.props.isAuthenticated} redirectToPath="/signin" path="*" component={NotFound} />
      </Switch>
    );

    if (this.props.isAuthenticated){
      routes = (
          <Switch>
            <Route path="/signin" component={asyncSignIn}/>    
            <Route path="/signup" component={asyncSignUp}/>  
            <Route path="/signout" component={asyncSignOut}/>                                    
            <ProtectedRoute isAccessible={this.props.isAuthenticated} redirectToPath="/signin" path="/tracking" component={asyncTracking}/>
            <ProtectedRoute isAccessible={this.props.isAuthenticated} redirectToPath="/signin" path="/settings" component={asyncSettings}/>
            <ProtectedRoute isAccessible={this.props.isAuthenticated} redirectToPath="/signin" path="/booking" component={asyncJob} />            
            <Route path="/" exact component={asyncDashboard}/>
            <Route path="*" component={NotFound} />            
          </Switch>
      );
    }
    
    return (
      <div>
        <Layout pathname={this.props.location.pathname} isAuth={this.props.isAuthenticated}>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authAgent.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
