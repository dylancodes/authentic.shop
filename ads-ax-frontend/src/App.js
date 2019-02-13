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

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <Provider store={store}>
            <AuthProvider>
              <Router>
                <Switch>
                  <Route exact path="/" component={LoginScreen} />
                  <Route exact path="/dashboard" component={AdminDashboard} />
                  <Route exact path="/dashboard/orders" component={OrdersComponent} />
                  <Route exact path="/dashboard/shops" component={ShopsComponent} />
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
