import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  let p;
  if(props.className) {
    p = <p data-testid='btn-element' onClick={props.onClick} className={props.className}>{props.text}</p>;
  } else {
    p = <p data-testid='btn-element' onClick={props.onClick} style={{ textAlign: 'center', fontSize: props.fontSize, fontFamily: 'Font Authentic', backgroundColor: props.bgColor, color: props.color, padding: props.padding }}>{props.text}</p>;
  }
  return (
    <React.Fragment>
      {p}
    </React.Fragment>
  )
}

Button.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Button;
