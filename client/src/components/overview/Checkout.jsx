import React, { useEffect, useState } from 'react';
import QtySelect from './QtySelector.jsx';

export default function Checkout ({ currentStyle }) {
  let skus = Object.keys(currentStyle.skus);
  let [currentSku, setCurrentSku] = useState(skus[0]);
  let [enableQty, setEnableQty] = useState(false);
  let [currQty, setCurrQty] = useState(0);

  useEffect(() => {
    skus = Object.keys(currentStyle.skus);
    setEnableQty(false);
    setCurrentSku(skus[0]);
  }, [currentStyle])

  console.log(currentStyle);
  console.log(skus);

  return (
    <div>
      <select name="Select a Size" onChange={e => {
        setCurrentSku(e.target.value);
        if (currentStyle.skus[e.target.value].quantity !== 0) {
          setEnableQty(true);
        }
        }}>
        <option value="Select a Size">Select a Size</option>
        {skus.map(sku => (<option key={sku} value={sku}>{currentStyle.skus[sku].size}</option>))}
      </select>
      <QtySelect
        currentStyle={currentStyle}
        enableQty={enableQty}
        currentSku={currentSku}
        setQty={setCurrQty}
      />
      <br/>
      <button onClick={() => console.log(currentSku, currQty)}>Add to Cart</button>
    </div>
  );
}