import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './style.css';

import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL).then((res) => res.json()).then((data) => {
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
    }).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(res => res.json()).then(data => {
        setExchangeRate(data.rates[toCurrency]);
      }).catch(err => console.error(err));
    }
  }, [fromCurrency, toCurrency]);

  let handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  let handleAmountToChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }


  return (
    <div>
      <>
        <h1>Currency Converter</h1>
        <CurrencyRow currencyOptions={currencyOptions} selectCurrency={fromCurrency} onChangeCurrency={e => setFromCurrency(e.target.value)} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
        <div className="equals">=</div>
        <CurrencyRow currencyOptions={currencyOptions} selectCurrency={toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount={handleAmountToChange} />
      </>
    </div>
  );
}

render(<App />, document.getElementById('root'));
