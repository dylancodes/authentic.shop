import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './_store.js';

import LoginScreen from './LoginScreen';
import AdminDashboard from './AdminDashboard';
import OrdersComponent from './OrdersComponent';
import ShopsComponent from './ShopsComponent';
import NotFound404 from './_components/NotFound404.js';
import './_styles/App.css';
import ErrorBoundary from './_components/ErrorBoundary.js';

import { AuthProvider } from './_contexts/authContext.js';
import { AuthConsumer } from './_contexts/authContext.js';

const withAuthConsumer = (C) => {
  return ({children, ...props}) => {
    return (
      <AuthConsumer>
        {obj => {
          return (
            <C {...props} authCtx={obj}>
              {children}
            </C>
          )
        }}
      </AuthConsumer>
    )
  }
}

const LoginScreen_Auth = withAuthConsumer(LoginScreen);
const AdminDashboard_Auth = withAuthConsumer(AdminDashboard);
const OrdersComponent_Auth = withAuthConsumer(OrdersComponent);
const ShopsComponent_Auth = withAuthConsumer(ShopsComponent);

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <Provider store={store}>
            <AuthProvider>
              <Router>
                <Switch>
                  <Route exact path="/" component={LoginScreen_Auth} />
                  <Route exact path="/dashboard" component={AdminDashboard_Auth} />
                  <Route exact path="/dashboard/orders" component={OrdersComponent_Auth} />
                  <Route exact path="/dashboard/shops" component={ShopsComponent_Auth} />
                  <Route component={NotFound404} />
                </Switch>
              </Router>
            </AuthProvider>
          </Provider>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
