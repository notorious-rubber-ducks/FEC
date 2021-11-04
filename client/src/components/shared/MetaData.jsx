import React from "react";

export default function MetaData (props) {
  const captureMetaData = function (e, target) {
    console.log(e.target)
    console.log(target)

  }

  return (
    <div>
      {props.children.map(child => React.cloneElement(child, {captureMetaData}))}
    </div>
  );
}