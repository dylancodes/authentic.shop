import React from 'react';

const Button = (props) => {
  let p;
  if(props.className) {
    p = <p onClick={props.onClick} className={props.className}>{props.text}</p>;
  } else {
    p = <p onClick={props.onClick} style={{ textAlign: 'center', fontSize: props.fontSize, fontFamily: 'Font Authentic', backgroundColor: props.bgColor, color: props.color, padding: props.padding }}>{props.text}</p>;
  }
  return (
    <React.Fragment>
      {p}
    </React.Fragment>
  )
}

export default Button;
