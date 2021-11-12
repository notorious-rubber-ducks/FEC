/* eslint-disable react/prop-types */
import React from 'react';

export default function ToggleSwitch({ text }) {
  return (
    <div className="toggle-switch">
      <span className="toggle-switch-description">{text}</span>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="switch">
        <input type="checkbox" />
        <span className="slide round" />
      </label>
    </div>
  );
}
