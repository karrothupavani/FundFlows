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
          
          const boxSize = 98;
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
            {logo:<Payment sx={{color:"rgba(255, 255, 255,0.9)"}} />,
            name:"P2P Payments",
            onclick:P2PPaymentsClick},
            {logo:<AccountBalance sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"P2P Loans",
            onclick:P2PLoansClick},
            {logo:<MonetizationOn sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"RO-RO Loans",
            onclick:ROROLoansClick},
            {logo:<AttachMoney sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"P2R Surplus ",
            onclick:P2RSurplusClick},
            {logo:<CreditCard sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"Payments",
            onclick:PaymentsClick},
            {logo:<LocalAtm sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
          name:"R2C Surplus ",
          onclick:R2CSurplusClick},
            {logo:<Receipt sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"Receipt From RO",
            onclick:ReceiptFromROClick},
            {logo:<Gavel sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
          name:"CO Levies",
          onclick:COLeviesClick},
            {logo:<AccountBalanceWallet sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
            name:"Assets Funds",
            onclick:AssetsFundsClick},
            {logo:<LocalAtmSharp sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
          name:"Term Loan Setoff",
          onclick:TermLoanSetoffClick},
            {logo:<AccountBalanceOutlined sx={{color:"rgba(255, 255, 255,0.9)"}}/>,
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


  return (
    <div style={{backgroundColor:"#bfffff",backgroundImage:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNO7CcR_2eeOpfCA6dqzU1mw2RSj2PWfIT6g&usqp=CAU)",backgroundRepeat:"no-repeat",backgroundSize:"cover",position:"fixed",width:"100%"}}>
     
      <div style={{ position: "absolute", fontFamily: "sans-serif"}}>
        {/* <h1 style={{
          backgroundImage: 'linear-gradient(to right, #0799fa, #82ffa1)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>Fund Management</h1> */}
      </div>
      <div style={{margin:"0px 0px 0px 90%",color:"white",cursor:"pointer"}} >
      
      <LoginOutlined sx={{width:50,height:50}} onClick={handleLogOut} />
      </div>
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
            width: `${2 * circleRadius}px`,
            height: `${2 * circleRadius}px`,
            border: "8px solid white",
            // backgroundImage: "linear-gradient(to right, #7c9cfc,#05a6a6)",
            borderRadius: "50%"
            ,alignItems:"center" 
          }}
        >
          <h1 style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            zIndex: 2, // Ensure it's above the icons
            fontFamily: "sans-serif",
          }}>Fund </h1>
          <h1 style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            zIndex: 2, // Ensure it's above the icons
            fontFamily: "sans-serif",
          }}>Management</h1>

          <Grid container justifyContent="center">
            {logos.map((logo, index) => {
              const { x, y } = calculatePosition(index);
              return (
                <Grid item key={index}
                  onMouseEnter={() => handleCircleHover(index)}
                  onMouseLeave={() => handleCircleHover(null)}
                  style={{
                    zIndex: calculateZIndex(index),
                  }}>
                  <Box
                  sx={{
                    width: `${boxSize}px`,
                    height: `${boxSize}px`,
                    backgroundImage: "linear-gradient(to right, rgba(7, 153, 250) ,#11faee)",
                    borderRadius: '50%',
                    // border:"2px solid #fff",
                    position: 'absolute',
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily:"sans-serif",
                    transition: 'box-shadow 0.5s ease',
                    '&:hover': {
                      boxShadow: '0px 0px 40px #fff',
                      border:"10px solid white"
                    },
                  }}
                  onClick={logo.onclick}
                >
                  {logo.logo}
                  <Typography variant="h6" sx={{ fontSize: '0.5rem',fontFamily:"sans-serif" , fontWeight:"bold",color:"white"}} >
                    {logo.name}
                  </Typography>
                </Box>
                
              </Grid>
            );
          })}
        </Grid>
        
        </div>
       
      </div>
     
    </div>
  );
};

export default Home1;
