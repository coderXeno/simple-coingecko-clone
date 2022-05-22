import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function CoinDetail({currency}){

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return(
        <div className="curr-detail">
            <img src={data.image.thumb} alt="coin"/>
            <p>{data.name}</p>
        </div>
    );
}