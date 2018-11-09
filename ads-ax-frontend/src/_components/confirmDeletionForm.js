import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

import Button from './Button.js';

class confirmDeletionForm extends Component {

  confirmDeletion = () => {
    try {
      this.props.confirm(this.props.item);
    }
    catch(err) {
      // log to service
      console.log(err);
      console.log("error in confirm deletion");
    }
  }

  cancelDeletion = (e) => {
    try {
      this.props.cancel(e);
    }
    catch(err) {
      // log to service
      console.log(err);
      console.log("error in confirm deletion");
    }
  }

  render() {
    return (
      <div style={{ fontSize: '12px', fontFamily: 'Font Authentic', height:'100%', width: '100%', backgroundColor: 'white', color: 'black'}}>
        <h3 data-testid='display-message'>Are you sure you want to delete {this.props.item}?</h3>
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

confirmDeletionForm.propTypes = {
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired
}

export default confirmDeletionForm;
