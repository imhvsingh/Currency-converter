import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { InputForm } from './components/InputForm/InputForm';
import './App.css';

const BASE_URL = 'https://api.exchangerate.host/latest';

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangedAmount, setExchangedAmount] = useState();

  const amountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    if (exchangeRate) {
      setExchangedAmount(newAmount * exchangeRate);
    }
  };

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch currency data');
        }
        const data = await response.json();
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };
    fetchCurrencyData();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div className='main'>
      <div className='container' id='panel'>
        <Header />
        <InputForm
          currencyOptions={currencyOptions}
          selectedFromCurrency={fromCurrency}
          selectedToCurrency={toCurrency}
          onChangeFromCurrency={(event) => setFromCurrency(event.target.value)}
          onChangeToCurrency={(event) => setToCurrency(event.target.value)}
          onAmountChange={amountChange}
          exchangedAmount={exchangedAmount}
        />
      </div>
    </div>
  );
}
