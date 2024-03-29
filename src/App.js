import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { InputForm } from './components/InputForm/InputForm.jsx'
import './App.css'

const Base_URL = 'https://api.exchangerate.host/latest';

export default function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangedAmount, setExchangedAmount] = useState()

  const amountChange = (e) => {
    setAmount(e.target.value);
    setExchangedAmount(e.target.value * exchangeRate)
  };

  useEffect(() => {
    (async () => {
      await fetch(Base_URL)
      .then(res => res.json())
      //.then(data => console.log(data))
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]) //destructured the objects
        setFromCurrency(data.base)
        setToCurrency(firstCurrency) 
        setExchangeRate(data.rates[firstCurrency])
      })
    })();
  }, [])

  useEffect(() => {
    (async () => {
      await fetch(`${Base_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    })();
  },[fromCurrency, toCurrency])

  return (
    <div className='main'>
      <div className='container' id='panel'>
        <Header />
        <InputForm 
            currencyOptions = { currencyOptions }
            selectedFromCurrency = { fromCurrency }
            selectedToCurrency = { toCurrency}
            onChangeFromCurrency = {event => setFromCurrency(event.target.value)}
            onChangeToCurrency = {event => setToCurrency(event.target.value)}
            onAmountChange = { amountChange }
            exchangedAmount = { exchangedAmount }
        />
      </div>
    </div>
  )
}
