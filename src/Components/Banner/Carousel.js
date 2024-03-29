import React, { useEffect, useState } from 'react'
import axios from "axios"
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from '../../config/api';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Carousel = () => {
    const [trending,setTrending]=useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins=async ()=>{
        const {data}=await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    console.log(trending);

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);

    const items=trending.map((coin)=>{

        let profit = coin?.price_change_percentage_24h >= 0;

            return(
                <Link to={`/coins/${coin.id}`} style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "white",
                  }}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                {coin?.symbol}
                &nbsp;
                <span
                    style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                    }}
                >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
                </Link>
            )
    })

    const responsive = {
        0: {//0px or higher 2 items will be shown
          items: 2,
        },
        512: {//512 px or higher 4 items will be shown
          items: 5,
        },
      };


  return (
    <div style={{height: "50%",display: "flex",alignItems: "center",}}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}//autoplayed every 1sec
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
      
    </div>
  )
}

export default Carousel
