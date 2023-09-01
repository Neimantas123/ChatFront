import React from 'react';

const ButtonDesktop = (props) => {
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
        marginTop: `${props.marginTop}`,
      }}
      onClick={props.onClick}
      className="btn-desktop"
    >
      {props.name}
    </button>
  );
};

export default ButtonDesktop;
