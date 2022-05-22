import './App.css';
import React from 'react';
import Coins from './Coins';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import CoinDetail from './CoinDetail';
/**
 * 
 * https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false
 */

function App() {

  let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const [coinNames, setCoinNames] = useState([]);

  useEffect(() => {
      axios.get(baseUrl)
      .then((res) => {
          res.data.map((item, index) => {
            setCoinNames(prevState => [
              ...prevState,
              item.id
            ]);
          });
      })
      .catch((err) => {
          console.log(err);
      })
  }, []);

  const currencies = [];
  coinNames.splice(100,200).map((coinIdx) => {
    currencies.push(coinIdx);
  })

  return(
    <Routes>
      <Route path='/' element={<Coins />} />
      {currencies.map((currency, index) => {
        return <Route key={index} path={`/coin/${currency}`} element={<CoinDetail currency={currency}/>} />
      })}
    </Routes>
  )
}

export default App;