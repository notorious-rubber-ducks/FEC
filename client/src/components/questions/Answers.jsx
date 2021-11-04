import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Helpful from "../shared/Helpful.jsx";

export default function Answer({id}) {
  console.log(id.date)
  let date = id.date.replace('T00:00:00.000Z', '');
  let splitDate = date.split('-');
  let [year, month, day] = splitDate;

  switch(month) {
    case '01':
      month = 'January';
      break;
    case '02':
      month = 'February';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'August';
      break;
    case '09':
      month = 'September';
      break;
    case '10':
      month = 'October';
      break;
    case '11':
      month = 'November';
      break;
    case '12':
      month = 'December';
      break;
    default:
      break;
  }

  date = `${month}, ${day} ${year}`;

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
      <span style={{fontSize:11}}>
        by {id.answerer_name}, {date} {'\u00A0'} {/* <- non-breaking space */}
      </span>
      <Helpful
        helpfulness={id.helpfulness}
        calledFrom='a'
        id={id.id}
      />
    </div>
  )
};