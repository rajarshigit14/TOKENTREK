
import { createContext, useContext, useEffect, useState  } from 'react'

const Crypto= createContext()//this allows a state to be available to the whole of the app

const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");
    useEffect(()=>{
        if(currency==="INR") setSymbol("₹")
        else if(currency ==="USD")setSymbol("$")
        else if (currency ==="EUR")setSymbol("€")
    },[currency]);
  return (
    <Crypto.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () =>{
    return useContext(Crypto);
}
