import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pw1: "",
      pw2: "",
      errMsg: this.props.errMsg
    }
    this.handleChange = this.handleChange.bind(this);
    this.validateMatchingPasswords = this.validateMatchingPasswords.bind(this);
  }

  componentDidUpdate(prevProps) {
     if(this.props.errMsg !== prevProps.errMsg) {
       this.setState({ errMsg: this.props.errMsg });
     }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  validateMatchingPasswords = (event) => {
    event.preventDefault();
    if(this.state.pw1 !== this.state.pw2) {
      this.setState({
        errMsg: "Passwords do not match - Please try again to continue."
      });
    } else {
      try {
        this.props.updatePassword(this.state.pw1);
      }
      catch(err) {
        console.log(err);
        console.log('error in new password form');
        // log to service
      }
    }
  }

  render() {
    let displayMsg;
    if(this.state.errMsg === '') {
      displayMsg = <img alt="Loading..." src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
    }
    else {
      displayMsg = <h4 data-testid='errMsg' style={{color:'red'}}>{this.state.errMsg}</h4>
    }
    return (
      <React.Fragment>
        <div className="loginscreen--div">
          <h2>Set a new password to continue</h2>
          <form onSubmit={this.validateMatchingPasswords}>
            <div className="input-wrapper">
              <label className="visuallyhidden" htmlFor="newpassword">New Password</label>
              <input className="input-element" type="password" id="newpassword" name="pw1" placeholder="New Password" value={this.state.pw1} onChange={this.handleChange} required/>
              <label className="visuallyhidden" htmlFor="confirmnewpassword">Confirm New Password</label>
              <input className="input-element" type="password" id="confirmnewpassword" name="pw2" placeholder="Confirm New Password" value={this.state.pw2} onChange={this.handleChange} required/>
              <input className="input-submit" type="submit" name="submit" data-testid="updatebtn" value="Update Password"/>
            </div>
          </form>
          {displayMsg}
        </div>
      </React.Fragment>
    );
  }
}

NewPasswordForm.propTypes = {
  updatePassword: PropTypes.func.isRequired
}

export default NewPasswordForm;
