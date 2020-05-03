import React from 'react';

export default function CurrencyRow({currencyOptions, selectCurrency, onChangeCurrency, amount, onChangeAmount}){
  const options = currencyOptions.map((opt, i) => (<option key={i} value={opt}>{opt}</option>));

  return(
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount} />
      <select value={selectCurrency} className="select" onChange={onChangeCurrency}>
        {options}
      </select>
    </div>
  )
}