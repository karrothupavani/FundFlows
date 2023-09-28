import React from 'react'
import Home1 from './Components/Home1'
import LoginPage from './Components/LoginPage'
import { BrowserRouter, Routes,Route} from 'react-router-dom'; 
import LoginPage1 from './Components/LoginPage1';
import LoginPage2 from './Components/LoginPage2';
import P2PPayments from './Components/P2PPayments'
import P2PLoans from './Components/P2PLoans'
import ROROLoans from './Components/RO-ROLoans'
import P2RSurplus from './Components/P2RSurplus'
import Payments from './Components/Payments'
import R2CSurplus from './Components/R2CSurplus'
import ReceiptFromRO from './Components/ReceiptFromRO'
import COLevies from './Components/COLevies'
import AssetsFunds from './Components/AssetsFunds'
import TermLoanSetoff from './Components/TermLoanSetoff'
import Reserves from './Components/Reserves' 
import Home from './Components/Home'
import Home2 from './Components/Home2'
import LoginPage3 from './Components/LoginPage3'
import './App.css'
import MenuBar from './Components/Menubar';
// import { Home } from '@mui/icons-material';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      {/* <LoginPage></LoginPage> */}
      {/* <LoginPage1/> */}
      {/* <Home></Home> */}
   
      <Routes>
          <Route exact path="/" element={<LoginPage2 />} />
          <Route  path="/Home" element={<Home2/>} />
          <Route  path="/P2PPayments" element={<P2PPayments />} />
          <Route  path="/P2PLoans" element={<P2PLoans />} />
          <Route  path="/ROROLoans" element={<ROROLoans />} />
          <Route  path="/P2RSurplus" element={<P2RSurplus />} />
          <Route  path="/Payments" element={<Payments />} />
          <Route  path="/R2CSurplus" element={<R2CSurplus />} />
          <Route  path="/ReceiptFromRO" element={<ReceiptFromRO />} />
          <Route  path="/COLevies" element={<COLevies />} />
          <Route  path="/AssetsFunds" element={<AssetsFunds />} />
          <Route  path="/TermLoanSetoff" element={<TermLoanSetoff />} />
          <Route  path="/Reserves" element={<Reserves />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
