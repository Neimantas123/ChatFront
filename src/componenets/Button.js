import React from 'react';

const Button = (props) => {
  return (
    <button
      type={props.type}
      style={{
        background: `${props.color}`,
        width: `${props.width}`,
        color: `${props.text}`,
        border: `${props.border}`,
        marginLeft: `${props.marginL}`,
        fontSize: `${props.font}`,
        height: `${props.height}`,
        margin: `${props.margin}`,
        position: `${props.position}`,
        bottom: `${props.bottom}`,
        marginTop: `${props.marginTop}`,
        marginBottom: `${props.marginBottom}`,
      }}
      onClick={props.onClick}
      className="btncom"
    >
      {props.name}
    </button>
  );
};

export default Button;
