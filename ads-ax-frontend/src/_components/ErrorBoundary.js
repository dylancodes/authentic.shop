import React from 'react';

import Header from './Header';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      stackTrace: ''
    }
  }

  componentDidCatch(error, info) {
    // log error to service
    console.log("Error Boundary");
    console.log(error);
    console.log("");
    console.log(info.componentStack);
    this.setState({ hasError: true });
    this.setState({ stackTrace: info.componentStack });
  }

  render() {
    if(this.state.hasError) {
      return (
        <div className="adbc-body">
          <Header />
          <h1 style={{fontSize: '50px', fontFamily:'Font Authentic'}}>ERROR</h1>
          <h4>Retreat back to safety!</h4>
          <h5>{this.state.stackTrace}</h5>
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
