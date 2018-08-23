import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './_store.js';

import LoginScreen from './LoginScreen';
import AdminDashboard from './AdminDashboard';
import OrdersComponent from './OrdersComponent';
import './_styles/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <React.Fragment>
              <Route exact path="/" component={LoginScreen} />
              <Route exact path="/dashboard" component={AdminDashboard} />
              <Route exact path="/dashboard/orders" component={OrdersComponent} />
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
