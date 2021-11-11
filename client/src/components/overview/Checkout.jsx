import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QtySelect from './QtySelector.jsx';

export default function Checkout ({ currentStyle }) {
  let skus = Object.keys(currentStyle.skus);
  let [currentSku, setCurrentSku] = useState(skus[0]);
  let [enableQty, setEnableQty] = useState(false);
  let [currQty, setCurrQty] = useState(0);
  let [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    skus = Object.keys(currentStyle.skus);
    setOutOfStock(false);
    if (skus[0] === 'null') {
      setOutOfStock(true);
    }
    setEnableQty(false);
    setCurrentSku(skus[0]);
  }, [currentStyle]);

  const handleSize = function (e) {
    if (e.target.value === 'Select a Size') {
      setEnableQty(false);
      return;
    }
    setCurrentSku(e.target.value);
    if (currentStyle.skus[e.target.value].quantity !== 0) {
      setEnableQty(true);
    }
  }

  const handleCheckout = function (sku_id) {
    axios.post('/cart', {sku_id})
    .then(status => console.log(status))
    .catch(err => console.error(err));
  }

  return (
    <div className='checkout'>
      <select name="Select a Size" onChange={handleSize} disabled={outOfStock}>
          {outOfStock
          ? <option value='out of stock'>OUT OF STOCK</option>
          : <option value="Select a Size">Select a Size</option>
          }
            {skus.map(sku => {
              if (sku === 'null') {
                return (<option key='oos'>OUT OF STOCK</option>)
              }
              return (<option key={sku} value={sku}>{currentStyle.skus[sku].size}</option>)
              })}
      </select> {'\u00A0'}{'\u00A0'}{'\u00A0'}
      <QtySelect
        currentStyle={currentStyle}
        enableQty={enableQty}
        currentSku={currentSku}
        setQty={setCurrQty}
      />
      <br/>
      <br/>
      <button onClick={() => handleCheckout(currentSku)} disabled={outOfStock}>Add to Cart</button>
    </div>
  );
}