import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import ConfirmDeletionForm from '../_components/confirmDeletionForm.js';
import Button from '../_components/Button.js';

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
      attachmentsState: true,
      changeColor: 'white ',
      showConfirmationForm: false
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  _click = (item) => {
    this.setState(prevState => ({ [item]: !prevState[item] }));
  }

  _save = (event, itemState) => {
    if(!this.state[itemState]) {
      // fire patch request method from container prop
      const params = {
        item: event.target.name,
        value: event.target.value
      };
      this.props.changeShop(this.state.shopAccount, params)
      .then((result) => {
        console.log(result);
        this.setState({ changeColor: 'green' });
        setTimeout(() => {
          this.setState({ changeColor: 'white' });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ changeColor: 'red' });
        setTimeout(() => {
          this.setState({ changeColor: 'white' });
        }, 2000);
      });
      this._click(itemState);
    }
    else {
      console.log("read only is locked on this element");
    }
  }

  handleRemove = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showConfirmationForm: !prevState.showConfirmationForm }));
    // this.props.removeShop(this.state.shopAccount);
  }

  render() {
    const bgColor = this.state.changeColor;
    return (
        <div className="shop-item" style={{ backgroundColor: bgColor }}>
        {this.state.showConfirmationForm ? <ConfirmDeletionForm confirm={this.props.removeShop} cancel={this.handleRemove} item={this.state.shopAccount}/> : <React.Fragment />}
        <Button onClick={this.handleRemove} bgColor={'white'} color={'#103C57'} text={'(x) REMOVE'} padding={'0px'} />
        <h4 style={{}}>{this.state.shopAccount}</h4>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Display Name <Button onClick={() => this._click("displayNameState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="displayName" name="displayName" value={this.state.displayName} readOnly={this.state.displayNameState} onChange={this.handleChange} onBlur={(event) => this._save(event, "displayNameState")}/>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Description <Button onClick={() => this._click("descriptionState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="description" name="description" value={this.state.description} readOnly={this.state.descriptionState} onChange={this.handleChange} onBlur={(event) => this._save(event, "descriptionState")}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>HQ <Button onClick={() => this._click("hqState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="hq" name="hq" value={this.state.hq} readOnly={this.state.hqState} onChange={this.handleChange} onBlur={(event) => this._save(event, "hqState")}/>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Contact Name <Button onClick={() => this._click("nameState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="contactName" name="contactName" value={this.state.contactName} readOnly={this.state.nameState} onChange={this.handleChange} onBlur={(event) => this._save(event, "nameState")}/>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Attachments <Button onClick={() => this._click("attachmentsState")} className={'edit-item'} text={'Edit'} /></h5>
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="col-element">
              <h5>Title <Button onClick={() => this._click("titleState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="contactTitle" name="contactTitle" value={this.state.contactTitle} readOnly={this.state.titleState} onChange={this.handleChange} onBlur={(event) => this._save(event, "titleState")}/>
              <h5>Phone <Button onClick={() => this._click("phoneState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="contactPhone" name="contactPhone" value={this.state.contactPhone} readOnly={this.state.phoneState} onChange={this.handleChange} onBlur={(event) => this._save(event, "phoneState")}/>
              <h5>Email <Button onClick={() => this._click("emailState")} className={'edit-item'} text={'Edit'} /></h5>
              <input className="item-element" type="text" id="contactEmail" name="contactEmail" value={this.state.contactEmail} readOnly={this.state.emailState} onChange={this.handleChange} onBlur={(event) => this._save(event, "emailState")}/>
            </Col>
          </Row>
        </div>
    );
  }
}

export default ShopItemComponent;
