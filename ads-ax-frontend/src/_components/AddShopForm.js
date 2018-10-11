import React, { Component } from 'react';
import '../_styles/LoginScreen.css';
import PropTypes from 'prop-types';

class AddShopForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopAccount: "",
      displayName: "",
      description: "",
      hq: "",
      contactName: "",
      contactEmail: "",
      contactTitle: "",
      contactPhone: "",
      attachments: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const shopParams = {
      shopAccount: event.target.shopAccount.value,
      displayName: event.target.displayName.value,
      hq: event.target.hq.value,
      description: event.target.description.value,
      contact: {
        email: event.target.contactEmail.value,
        name: event.target.contactName.value,
        phone: event.target.contactPhone.value,
        title: event.target.contactTitle.value
      },
      attachments: event.target.attachments.value
    }
    this.props.createShop(shopParams);
  }

  render() {
    return (
      <React.Fragment>
        <div className="loginscreen--div">
          <h2>Create New Shop</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrapper">
              <input className="input-element" type="text" id="shopAccount" name="shopAccount" placeholder="Shop Account" value={this.state.shopAccount} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="displayName" name="displayName" placeholder="Display Name" value={this.state.displayName} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="description" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="hq" name="hq" placeholder="HQ" value={this.state.hq} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="contactName" name="contactName" placeholder="Contact Name" value={this.state.contactName} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="contactEmail" name="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="contactTitle" name="contactTitle" placeholder="Contact Title" value={this.state.contactTitle} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="contactPhone" name="contactPhone" placeholder="Contact Phone" value={this.state.contactPhone} onChange={this.handleChange} required/>
              <input className="input-element" type="text" id="attachments" name="attachments" placeholder="Attachments" value={this.state.attachments} onChange={this.handleChange} required/>
              <input className="input-submit" type="submit" name="submit" data-testid="addbtn" value="Create Shop"/>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

// prop-types

export default AddShopForm;
