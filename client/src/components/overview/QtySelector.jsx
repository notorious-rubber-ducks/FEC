import React, { useEffect, useState } from 'react';

export default function QtySelect ({ currentStyle, enableQty, currentSku, setQty}) {
  let [qtyRange, setQtyRange] = useState([]);

  useEffect(() => {
    let range = [];
    for (let i = 1; i <= currentStyle.skus[currentSku].quantity; i++) {
      if (i > 15) {
        break;
      }
      range.push(i);
    }
    setQtyRange(range);
  }, [currentSku]);

  return (
    <select name="Qty" disabled={!enableQty} onChange={e => setQty(e.target.value) }>
      {!enableQty && <option value="--">--</option>}
      {qtyRange.map(qty => <option key={qty} value={qty}>{qty}</option>)}
    </select>
  );
}