import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Helpful from "../shared/Helpful.jsx";

export default function Answer({id}) {
  //console.log(id);
  let answerStyle = {
    border: '1px solid black',
    borderRadius: '3px'
  }

  let answerFontStyle = {
    fontWeight: 'bold',
    fontSize: 14
  }

  return (
    <div style={answerStyle}>
      <span style={answerFontStyle}>
        A: {id.body}
      </span>
      <br/>
      {id.answerer_name} {'\u00A0'} {/* <- non-breaking space */}
      <Helpful
        helpfulness={id.helpfulness}
        calledFrom='a'
        id={id.id}
      />
    </div>
  )
};