import React from 'react'
import { AppBar,Container,MenuItem,Select,ThemeProvider,Toolbar,Typography, createTheme} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
    const {currency,setCurrency}=CryptoState();
    const navigate=useNavigate();
    const darkTheme = createTheme({
        palette: {
          primary: {
            main:"#fff",
         },
        mode: 'dark',
        },
      });
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static' >
        <Container>
            <Toolbar >
                <Typography variant='h6' onClick={()=>navigate("/")} style={{flex: 1,//so that the whole width is utilized
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",}}>
                    TokenTrek
                </Typography>
                <Select variant='outlined'style={{width:100,height:40,marginRight:15}} 
                value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
