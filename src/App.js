import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin/Coin'
import './App.css';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(res => {
      setCoins(res.data);
    }).catch(error => alert('Error'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search for a coin</h1>
        <form>
          <input className="coin-input" type="text" placeholder="Search" onChange={handleChange}/>
        </form>
      </div>
      <br></br>
      {filteredCoins.map(coin => {
        return <Coin key={coin.id} name={coin.name} 
                    image={coin.image} symbol={coin.symbol} 
                    volume={coin.total_volume}
                     price={coin.current_price} priceChange={coin.price_change_percentage_24h}
                     mkt_cap={coin.market_cap}/>
      })}
    </div>
  );
}

export default App;
