import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import Button from './Button.js';

class confirmDeletionForm extends Component {
  
  confirmDeletion = () => {
    this.props.confirm(this.props.item)
  }

  cancelDeletion = (e) => {
    this.props.cancel(e);
  }

  render() {
    return (
      <div style={{ fontSize: '12px', fontFamily: 'Font Authentic', height:'100%', width: '100%', backgroundColor: 'white', color: 'black'}}>
        <h3>Are you sure you want to delete {this.props.item}?</h3>
        <Row>
          <Col xs={6} sm={6} md={3} lg={3} className="col-element">
            <Button text={'Delete'} onClick={this.confirmDeletion} />
          </Col>
          <Col xs={6} sm={6} md={3} lg={3} className="col-element">
          <Button text={'Cancel'} onClick={this.cancelDeletion} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default confirmDeletionForm;
