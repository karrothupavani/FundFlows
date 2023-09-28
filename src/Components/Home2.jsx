import React, { useState } from 'react';
import Header from './Header';
import { Box, Grid, Typography } from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from 'react-router-dom';
import { Payment, AccountBalance, MonetizationOn, AttachMoney, CreditCard, LocalAtm, Receipt, Gavel, AccountBalanceWallet, LocalAtmSharp, AccountBalanceOutlined,LoginOutlined } from '@mui/icons-material';
// import { BrowserRouter, Routes,Route} from 'react-router-dom'; 
import image from './finance1.gif'
import image1 from './finance.gif'
import { Avatar } from 'antd';
// import Sidebar2 from './Sidebar2';

        const Home1 = () => {
          
        //   const boxSize = 98;
          const circleRadius = 180; // Reduced radius for less margin

          const calculatePosition = (index) => {
            const angle = (index * (2 * Math.PI)) / 11;
            const x = circleRadius * Math.cos(angle);
            const y = circleRadius * Math.sin(angle);
            return { x, y };
          };
        const Navigate = useNavigate();
        const P2PPaymentsClick =()=>{
          Navigate("/P2PPayments");
        }
        const P2PLoansClick =()=>{
          Navigate("/P2PLoans");
        }
        const ROROLoansClick =()=>{
          Navigate('/ROROLoans');
        }
        const P2RSurplusClick =()=>{
          Navigate("/P2RSurplus");
        }
        const PaymentsClick=()=>{
          Navigate("/Payments")
        }
        const R2CSurplusClick=()=>{
          Navigate("/R2CSurplus")
        }
        const ReceiptFromROClick=()=>{
          Navigate("/ReceiptFromRO")
        }
        const COLeviesClick=()=>{
          Navigate("/COLevies")
        }
        const AssetsFundsClick=()=>{
          Navigate("/AssetsFunds")
        }
        const TermLoanSetoffClick=()=>{
          Navigate("/TermLoanSetoff")
        }
        const ReservesClick=()=>{
          Navigate("/Reserves")
        }
        const handleLogOut=()=>{
          alert('do you want to log out')
          Navigate('/')
        }
          const logos = [
            {logo:<Payment sx={{color:"#09294a"}} />,
            name:"P2P Payments",
            onclick:P2PPaymentsClick},
            {logo:<AccountBalance sx={{color:"#09294a"}}/>,
            name:"P2P Loans",
            onclick:P2PLoansClick},
            {logo:<MonetizationOn sx={{color:"#09294a"}}/>,
            name:"RO To RO Loans",
            onclick:ROROLoansClick},
            {logo:<AttachMoney sx={{color:"#09294a"}}/>,
            name:"P2R Surplus ",
            onclick:P2RSurplusClick},
            {logo:<CreditCard sx={{color:"#09294a"}}/>,
            name:"Payments",
            onclick:PaymentsClick},
            {logo:<LocalAtm sx={{color:"#09294a"}}/>,
          name:"R2C Surplus ",
          onclick:R2CSurplusClick},
            {logo:<Receipt sx={{color:"#09294a"}}/>,
            name:"Receipt From RO",
            onclick:ReceiptFromROClick},
            {logo:<Gavel sx={{color:"#09294a"}}/>,
          name:"CO Levies",
          onclick:COLeviesClick},
            {logo:<AccountBalanceWallet sx={{color:"#09294a"}}/>,
            name:"Assets Funds",
            onclick:AssetsFundsClick},
            {logo:<LocalAtmSharp sx={{color:"#09294a"}}/>,
          name:"Term Loan Setoff",
          onclick:TermLoanSetoffClick},
            {logo:<AccountBalanceOutlined sx={{color:"#09294a"}}/>,
            name:"Reserves",
            onclick:ReservesClick},
            
          ]
          const calculateZIndex = (index) => {
            return index === hoveredIndex ? 1 : 0;
          };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleCircleHover = (index) => {
    setHoveredIndex(index);
  };
  const boxSize = 98;
  const spaceBetweenCircles = 0; // Adjust as needed
  const totalWidth = logos.length * (boxSize + spaceBetweenCircles);
  const startingX = (window.innerWidth - totalWidth) / 2; // Center the circles horizontally
  const topRowY = -0; // Adjust as needed for top row
  const bottomRowY = 100; 
  return (
    <div style={{backgroundColor:"#bfffff",
    backgroundImage: "linear-gradient(to right,#d8e6f0,#97b0c2)"
    // ,backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNO7CcR_2eeOpfCA6dqzU1mw2RSj2PWfIT6g&usqp=CAU)",backgroundRepeat:"no-repeat",backgroundSize:"cover"
    ,position:"fixed",width:"100%"}}>
     <div style={{display:"flex"}}>
      <div style={{ position: "absolute", fontFamily: "sans-serif"}}>
        <h1 style={{
          backgroundImage: 'linear-gradient(to right, #09294a, #09294a)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>Fund Flows</h1>
      </div>
      <div style={{ margin: "0px 0px 0px 90%", color: "white", cursor: "pointer" }}>
        <LoginOutlined sx={{ width: 50, height: 50 ,color:"#09294a",
          backgroundClip: 'text',}} onClick={handleLogOut} />
      </div></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '91vh',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: `${totalWidth}px`, // Adjust the width
            height: `${boxSize}px`, // Set the height based on the box size
            alignItems: "center"
          }}
        >
          {/* <h1 style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            zIndex: 2,
            fontFamily: "sans-serif",
          }}>Fund Management</h1> */}

          {logos.map((logo, index) => {
            const x = startingX + index * (boxSize + spaceBetweenCircles);
            const y = index % 2 === 0 ? topRowY : bottomRowY;
            return (
              <Box
                key={index}
                sx={{
                  width: `${boxSize}px`,
                  height: `${boxSize}px`,
                  backgroundImage: "linear-gradient(to right, rgba(7, 153, 250) ,#11faee)",
                  borderRadius: '50%',
                  position: 'absolute',
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor:'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "sans-serif",
                  transition: 'box-shadow 0.5s ease',
                  '&:hover': {
                    boxShadow: '0px 0px 90px black',
                    border:'10px solid white'
                  },
                }}
                onClick={logo.onclick}
              >
                {logo.logo}
                <Typography variant="h6" sx={{ fontSize: '0.5rem', fontFamily: "sans-serif", fontWeight: "bold", color: "white" }}>
                  {logo.name}
                </Typography>
              </Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home1;
