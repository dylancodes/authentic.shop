import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../_styles/shops.css';

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
      attachments: [],
      hasError: false,
      errorMessage: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      const shopParams = {
        shopAccount: this.state.shopAccount,
        displayName: this.state.displayName,
        hq: this.state.hq,
        description: this.state.description,
        contact: {
          email: this.state.contactEmail,
          name: this.state.contactName,
          phone: this.state.contactPhone,
          title: this.state.contactTitle
        },
        attachments: this.state.attachments
      }
      this.props.addShop(shopParams);
      this.props.showForm();
    }
    catch(err) {
      // log unsuccessful add
      // show unsuccessful add message
      if(!err.type === 'test') {
        console.log(err);
      }
      this.setState({
        hasError: true,
        errorMessage: "Fuck, we fucked up. Wasn't able to add the new shop. Try again, or feel free to hit up somebody to come fix this shit!"
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="addshop--div">
          <h2>Create New Shop</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="input-wrapper-shops">
              <input className="input-element-shops" type="text" id="shopAccount" name="shopAccount" placeholder="Shop Account" value={this.state.shopAccount} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="displayName" name="displayName" placeholder="Display Name" value={this.state.displayName} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="description" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="hq" name="hq" placeholder="HQ" value={this.state.hq} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="contactName" name="contactName" placeholder="Contact Name" value={this.state.contactName} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="contactEmail" name="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="contactTitle" name="contactTitle" placeholder="Contact Title" value={this.state.contactTitle} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="contactPhone" name="contactPhone" placeholder="Contact Phone" value={this.state.contactPhone} onChange={this.handleChange} required/>
              <input className="input-element-shops" type="text" id="attachments" name="attachments" placeholder="Attachments" value={this.state.attachments} onChange={this.handleChange} />
              <input className="input-submit-shops" type="submit" name="submit" data-testid="addbtn" value="Create Shop"/>
              {this.state.hasError ? <h4 data-testid="error-message">{this.state.errorMessage}</h4> : <React.Fragment />}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

AddShopForm.propTypes = {
  addShop: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired
}

export default AddShopForm;
