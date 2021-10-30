import React, { useContext } from 'react';
import AppContext from '../../hooks/context';

export default function Overview() {
  return (
    <div>
      <AppContext.Consumer>
        {(value) => (<div>{value.defaultItem.id}</div>)}
      </AppContext.Consumer>
    </div>
  );
}
