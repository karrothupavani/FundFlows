import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer,useMediaQuery, useTheme  } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import P2PLoans from './P2PLoans';
import P2PPayments from './P2PPayments';
import { Payment, AccountBalance, MonetizationOn, AttachMoney, CreditCard, LocalAtm, Receipt, Gavel, AccountBalanceWallet, LocalAtmSharp, AccountBalanceOutlined ,LoginOutlined} from '@mui/icons-material';


const drawerWidth = 200;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    marginTop: 64,
     // Adjust the marginTop value as needed
     [theme.breakpoints.down('sm')]: {
      width: drawerWidth - 150, // Set a narrower width on small screens
      marginTop:56,
      padding:10,
    },
  },
  
}));


const Sidebar = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [value,Setvalue] =useState("1")

  const MainContent = ({ selectedItem }) => {
    switch (selectedItem) {
      case 'P2P Payments':
        return <P2PPayments />;
      // Add cases for other components
      default:
        return <div>Default Content</div>;
    }
  };



  const P2PPaymentsClick =(event,newValue)=>{
  //  open(<P2PPayments/>)
   
  }
  const P2PLoansClick =()=>{
   
  }
  const ROROLoansClick =()=>{
   
  }
  const P2RSurplusClick =()=>{
   
  }
  const PaymentsClick=()=>{
   
  }
  const R2CSurplusClick=()=>{
   
  }
  const ReceiptFromROClick=()=>{
   
  }
  const COLeviesClick=()=>{
   
  }
  const AssetsFundsClick=()=>{
   
  }
  const TermLoanSetoffClick=()=>{
   
  }
  const ReservesClick=()=>{
   
  }
  const [selectedItem, setSelectedItem] = useState(-1);
  

  
  const sidebarItems = [
    { name: 'P2P Payments', icon: <Payment sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:P2PPaymentsClick },
    { name: 'P2P Loans', icon: <AccountBalance sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:P2PLoansClick },
    { name: 'RO-RO Loans', icon: <MonetizationOn sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:ROROLoansClick },
    { name: 'P2R Surplus', icon: <AttachMoney sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:P2RSurplusClick },
    { name: 'Payments', icon: <CreditCard sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick: PaymentsClick},
    { name: 'R2C Surplus', icon: <LocalAtm sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:R2CSurplusClick },
    { name: 'Receipt From RO', icon: <Receipt sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:ReceiptFromROClick },
    { name: 'CO Levies', icon: <Gavel sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:COLeviesClick },
    { name: 'Assets Funds', icon: <AccountBalanceWallet sx={{fontSize:"18px"}} />, fontSize: '0.875rem',onclick:AssetsFundsClick},
    { name: 'Term Loan Setoff', icon: <LocalAtmSharp sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:TermLoanSetoffClick },
    { name: 'Reserves', icon: <AccountBalanceOutlined sx={{fontSize:"18px"}}/>, fontSize: '0.875rem',onclick:ReservesClick },
  ];
  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item index
    // callback(); // Call the provided callback function
  };
    
  return (
    <StyledDrawer variant="permanent">
      <div style={{ marginTop: -5 }} /> {/* This is the toolbar */}
      <List style={{padding:"10px"}} >
        {sidebarItems.map((item,index) => (
          <ListItem button key={item.index}
           style={{borderRadius:"10px",padding:"7.5px", backgroundColor: selectedItem === item.text ? '#f0f0f0' : 'transparent',}}
           onClick={() => handleItemClick(index, item.onclick,item.name)} // Pass index and callback to handleItemClick
        >
            <ListItemIcon  sx={{fontSize:"1rem",marginLeft:1}}>{item.icon}</ListItemIcon>
            {!isSmallScreen && (
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ style: { fontSize: item.fontSize,marginLeft: -20  } }}
              />
            )}
            
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
