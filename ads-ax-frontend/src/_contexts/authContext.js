import React from 'react';

const AuthContext = React.createContext({ status: false });

class AuthProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      isFirstLogin: false,
      toggleAuth: this.toggleAuth,
      toggleFirstLogin: this.toggleFirstLogin
    };
  }

  toggleAuth = () => {
    this.setState(prevState => ({
      isAuthenticated: !prevState.isAuthenticated
    }));
  }

  toggleFirstLogin = () => {
    this.setState(prevState => ({
      isFirstLogin: !prevState.isAuthenticated
    }));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
