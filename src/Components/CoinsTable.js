import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import axios from "axios";
import { CryptoState } from '../CryptoContext';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme,  Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsTable = () => {
    const {currency, symbol}=CryptoState();
const [coins,setCoins]=useState([]);
const [loading,setLoading]=useState(false);
const [search,setSearch]=useState();
const [page, setPage] = useState(1);
const navigate=useNavigate()

const fetchCoins=async ()=>{
        setLoading(true);
        const {data}=await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
useEffect(()=>{
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
},[currency]);

const darkTheme = createTheme({
    palette: {
      primary: {
        main:"#fff",
     },
    mode: 'dark',
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };


  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: 'center'}}>
            <Typography variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat" }}>
                    Cryptocurrency Rates Based on Market Capital
            </Typography>

            <TextField label="Search your Crypto Currency.." variant='outlined'
            style={{marginBottom:'20', width:"100%"}}
            onChange={(e)=>setSearch(e.target.value)}/>

            <TableContainer>
            {loading ? ( //checking if the coins are still loading or not
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ):(
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor:"gold"}}>
                        <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                            <TableCell
                            style={{
                                color: "black",
                                fontWeight: "700",
                                fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                            >
                            {head}
                        </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10) //showing only 10 items in 1 page
                    .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coin/${row.id}`)}
                        style={{ 
                            backgroundColor: "#152238",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#131111",
                            },
                            fontFamily: "Montserrat",
                          }}
                        key={row.name}
                      >
                         <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                            })}
                      </TableBody>
                </Table>

          )}
            </TableContainer>
            {/* Comes from @material-ui/lab */}
            <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
            
                    "& .MuiPaginationItemRoot": {
                      color: "gold",
                    }
            }}
            
            onChange={(_, value) => { //on clicking on any of the page we want to set the page value and scroll it up
                setPage(value);
                window.scroll(0, 450);
            }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
