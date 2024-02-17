import {BrowserRouter,  Route, Routes} from "react-router-dom";
import './App.css';
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";


function App() {
  

  return (
    <BrowserRouter>
    <div style={{backgroundColor:"#152238", color:"white",minHeight:"100vh"}}>
      <Header/>
      <Routes>
      <Route path="/" Component={Homepage} exact></Route>
      <Route path="/coin/:id" Component={CoinPage}></Route>
      </Routes>
    </div>

    </BrowserRouter>
  );
}

export default App;
