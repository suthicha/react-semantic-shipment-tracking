import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/authReducer';
import signupReducer from './store/reducers/signupReducer';
import ordersReducer from './store/reducers/ordersReducer';
import trackingReducer from './store/reducers/trackingReducer';
import jobReducer from './store/reducers/jobReducer';
import jobModalReducer from './store/reducers/jobModalReducer';
import settingReducer from './store/reducers/settingReducer';
import userReducer from './store/reducers/userReducer';
import companyReducer from './store/reducers/companyReducer';

// const history = createBrowserHistory();
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    authAgent: authReducer,
    signupAgent: signupReducer,
    ordersAgent: ordersReducer,
    trackingAgent: trackingReducer,
    jobAgent: jobReducer,
    jobModalAgent: jobModalReducer,
    settingAgent: settingReducer,
    userAgent: userReducer,
    companyAgent: companyReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(
app, document.getElementById('root'));
registerServiceWorker();
