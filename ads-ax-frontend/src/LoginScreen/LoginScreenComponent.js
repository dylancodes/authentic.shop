import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginScreenComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMsg: this.props.errMsg
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidUpdate(prevProps) {
     if(this.props.errMsg !== prevProps.errMsg) {
       this.setState({ errMsg: this.props.errMsg });
     }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  validateForm = event => {
    event.preventDefault();
    if(this.state.username.length > 0 && this.state.password.length > 0) {
      this.props.onFormSubmission(this.state.username, this.state.password);
    }
    else {
      this.setState({ errMsg: "Please fill in all fields to continue" });
    }
  }

  render() {
    let displayMsg;
    if(this.state.errMsg === "") {
      displayMsg = <img alt="Loading..." src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
    }
    else {
      displayMsg = <h4 data-testid='errMsg' style={{color:'red'}}>{this.state.errMsg}</h4>
    }
    return (
      <div className="loginscreen--div">
        <h1>Admin.Authentic.Shop</h1>
        <form onSubmit={this.validateForm}>
          <div className="input-wrapper">
            <label className="visuallyhidden" htmlFor="username">Username</label>
            <input className="input-element" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
            <label className="visuallyhidden" htmlFor="password">Password</label>
            <input className="input-element" type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            <input className="input-submit" type="submit" name="submit" data-testid="submitBtn" value="Login"/>
          </div>
        </form>
        {displayMsg}
      </div>
    );
  }
}

LoginScreenComponent.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
  errMsg: PropTypes.string
}

export default LoginScreenComponent;
