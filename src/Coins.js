import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClockLoader } from "react-spinners";

export default function Coins(){
    let baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [itemsVis, setItemsVis] = useState(500);

    const [sortedMktPrice, setSortedMktPrice] = useState(false);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itemsVis}&page=1&sparkline=false`)
        .then((res) => {
            setCoins(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [itemsVis]);

    const filteredCoins = coins.filter((coin) => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    function handleItemsIp(event){
        setTimeout(() => {
            if(event.target.value >=5 || event.target.value <= 500){
                setItemsVis(prevState => event.target.value);
                toast.success(`Visible Currencies: ${event.target.value == '' ? '500' : event.target.value}`, {
                    autoClose: 2000
                });
            } else {
                toast.error("Please type a number between 5 to 500", {
                    autoClose: 4000
                });
            }
        }, 3000);
    }

    function sortByPrice(curr1, curr2){
        if(curr1.current_price < curr2.current_price){
            return 1;
        } 
        
        if(curr1.current_price > curr2.current_price){
            return -1;
        }

        return 0;
    }

    function handleSort(event){
        event.preventDefault();
        setSortedMktPrice(prevState => !prevState);
    }

    return (
        <div className="coin-app">
            <ToastContainer/>
            {
                filteredCoins.length == 0 ? <ClockLoader/> :
                <div>
                    <div className='coin-search'>
                        <h1 className='coin-text'>CryptoX</h1>
                        <form className="search">
                            <input 
                                type="text" 
                                placeholder='Search'
                                onChange={(event) => setSearch(event.target.value)}
                            />

                            <input 
                                type="text"
                                placeholder="No. of Currencies To Display"
                                onChange={(event) => {
                                    handleItemsIp(event)
                                }}
                            />

                            <button onClick={handleSort}>Price</button>
                        </form>
                    </div>

                    <div className="info-curr">
                        <p className="cnc">Currency</p>
                        <p className="cnp">Current Price</p>
                        <p className="cnv">Volume</p>
                        <p className="cnh">Price Change in 24h</p>
                        <p className="cnm">Market Cap</p>
                    </div>

                    {
                        sortedMktPrice == '' ? filteredCoins.map(coin => {
                            return(
                                <Coin 
                                    key={coin.id}
                                    id={coin.id}
                                    name={coin.name}
                                    image={coin.image}
                                    symbol={coin.symbol}
                                    marketCap={coin.market_cap}
                                    price={coin.current_price} 
                                    priceChange={coin.price_change_percentage_24h}
                                    volume={coin.total_volume}
                                />
                            );
                        }) : filteredCoins.sort(sortByPrice).map(coin => {
                            return(
                                <Coin 
                                    key={coin.id}
                                    id={coin.id}
                                    name={coin.name}
                                    image={coin.image}
                                    symbol={coin.symbol}
                                    marketCap={coin.market_cap}
                                    price={coin.current_price} 
                                    priceChange={coin.price_change_percentage_24h}
                                    volume={coin.total_volume}
                                />
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}