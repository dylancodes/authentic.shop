import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class ShopItemComponent extends React.Component {
  constructor(props) {
    super(props);
    const shopItem = this.props.item;
    
    this.state = {
      shopAccount: shopItem.shopAccount,
      displayName: shopItem.displayName,
      hq: shopItem.hq,
      description: shopItem.description,
      contactEmail: shopItem.contact.email,
      contactName: shopItem.contact.name,
      contactPhone: shopItem.contact.phone,
      contactTitle: shopItem.contact.title,
      attachments: shopItem.attachments,
      displayNameState: true,
      hqState: true,
      descriptionState: true,
      emailState: true,
      nameState: true,
      phoneState: true,
      titleState: true,
      attachmentsState: true
    }

    this.handleChange = this.handleChange.bind(this);
    this._save = this._save.bind(this);
    this._click = this._click.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  _click(item) {
    this.setState(prevState => ({ [item]: !prevState[item] }));
  }

  _save(event, item) {
    if(!this.state[item]) {
      // fire patch request method from container prop
      console.log(event.target.name);
      console.log(item);
      this._click(item);
    }
    else {
      console.log("read only is locked on this element");
    }
  }

  render() {
    return (
        <div className="shop-item">
        <h4>{this.state.shopAccount}</h4>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Display Name <a onClick={() => this._click("displayNameState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="displayName" name="displayName" value={this.state.displayName} readOnly={this.state.displayNameState} onChange={this.handleChange} onBlur={(event) => this._save(event, "displayNameState")}/>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Description <a onClick={() => this._click("descriptionState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="description" name="description" value={this.state.description} readOnly={this.state.descriptionState} onChange={this.handleChange} onBlur={(event) => this._save(event, "descriptionState")}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>HQ <a onClick={() => this._click("hqState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="hq" name="hq" value={this.state.hq} readOnly={this.state.hqState} onChange={this.handleChange} onBlur={(event) => this._save(event, "hqState")}/>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Contact Name <a onClick={() => this._click("nameState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="contactName" name="contactName" value={this.state.contactName} readOnly={this.state.nameState} onChange={this.handleChange} onBlur={(event) => this._save(event, "nameState")}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Attachments <a onClick={() => this._click("attachmentsState")} href="#" className="edit-item">Edit</a></h5>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Title <a onClick={() => this._click("titleState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="contactTitle" name="contactTitle" value={this.state.contactTitle} readOnly={this.state.titleState} onChange={this.handleChange} onBlur={(event) => this._save(event, "titleState")}/>
              <h5>Phone <a onClick={() => this._click("phoneState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="contactPhone" name="contactPhone" value={this.state.contactPhone} readOnly={this.state.phoneState} onChange={this.handleChange} onBlur={(event) => this._save(event, "phoneState")}/>
              <h5>Email <a onClick={() => this._click("emailState")} href="#" className="edit-item">Edit</a></h5>
              <input className="item-element" type="text" id="contactEmail" name="contactEmail" value={this.state.contactEmail} readOnly={this.state.emailState} onChange={this.handleChange} onBlur={(event) => this._save(event, "emailState")}/>
            </Col>
          </Row>
        </div>
    );
  }
}

export default ShopItemComponent;
