import React from "react";
import { useNavigate } from "react-router-dom";
import "./Coin.css";

export default function Coin({ name, id, image, symbol, price, volume, priceChange, marketCap}){

    let navigate = useNavigate();

    function handleNav(event, nameCurr){
        navigate(`/coin/${nameCurr}`);
    }

    return(
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img 
                        onClick={(event) => {
                            handleNav(event, id)
                        }} 
                        src={image} 
                        alt="coins"
                    />
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
            </div>

            <div className="coin-data">
                <p className="coin-price">${price}</p>
                <p className="coin-volume">${volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                    <p className="coin-percent red">{priceChange.toFixed(3)}%</p>
                ):(
                    <p className="coin-percent green">{priceChange.toFixed(3)}%</p>
                )}
                <p className="coin-marketcap">
                    ${marketCap.toLocaleString()}
                </p>
            </div>
        </div>
    );
}