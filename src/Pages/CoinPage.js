import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from "axios";
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
//import { ThemeProvider,theme } from '@emotion/react';
import { LinearProgress, Typography } from '@mui/material';
import parser from "html-react-parser";




export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

const CoinPage = () => {
    const [coin,setCoin]=useState();
    const { id }=useParams();
    const {currency,symbol}=CryptoState();

    const fetchCoin=async()=>{
        const { data }=await axios.get(SingleCoin(id));

        setCoin(data);
    }

    useEffect(()=>{
        fetchCoin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // const container={
    //     display: "flex",
    //     '@media screen and (min-width: 601px) and (max-width: 900px)':{
            
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center",
    //     }     
    // }
    // const sidebar={
    //     width: "30%",
    //     display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   marginTop: 25,
    //   borderRight: "2px solid grey",
    // '@media screen and (min-width: 601px) and (max-width: 900px)':{
    //     width: "100%",
    //   }
    // }
    // const marketData ={
    //   alignSelf: "start",
    //   padding: 25,
    //   paddingTop: 10,
    //   width: "100%",
    //   '@media screen and (min-width: 601px) and (max-width: 900px)':{
    //     display: "flex",
    // justifyContent: "space-around",
    //   },
    //   '@media screen and (max-width:600px)':{
    //     flexDirection: "column",
    //     alignItems: "center",
    //   },

    // }
    

if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return ( 
    <div className='container' style={{display:'flex'}} >
    
        <div className='sidebar' 
           style={{
        width: "30%",
        margin:"auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
            
            }}
         >
        <img className='coinImg'
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={{fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",}}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
            }}>
          {parser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className='marketData'
        // style={marketData
        //     //  alignSelf: "start",
        //     //  padding: 25,
        //     //  paddingTop: 10,
        //     //  width: "100%",            
        //     }
        >
           
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
            }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
            }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
            }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
            
        </div>
    <CoinInfo coin={coin}/>
    </div>
  );
}

export default CoinPage;
