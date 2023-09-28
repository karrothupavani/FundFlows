// src/Sidebar.js
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FolderIcon from '@mui/icons-material/Folder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';

const fields = [
    { text: 'P2P Payments', icon: <AccountBalanceIcon />, content: 'Content for P2P Payments' },
    { text: 'P2P Loans', icon: <TimelineIcon />, content: 'Content for P2P Loans' },
    { text: 'RORO Loans', icon: <DescriptionIcon />, content: 'Content for RORO Loans' },
    { text: 'P2R Surplus', icon: <CalendarTodayIcon />, content: 'Content for P2R Surplus' },
    { text: 'Payments', icon: <DateRangeIcon />, content: 'Content for Payments' },
    { text: 'R2C Surplus', icon: <ReceiptIcon />, content: 'Content for R2C Surplus' },
    { text: 'Receipt From RO', icon: <FolderIcon />, content: 'Content for Receipt From RO' },
    { text: 'CO Levies', icon: <ListAltIcon />, content: 'Content for CO Levies' },
    { text: 'Assets Funds', icon: <AttachMoneyIcon />, content: 'Content for Assets Funds' },
    { text: 'Term Loan Setoff', icon: <InfoIcon />, content: 'Content for Term Loan Setoff' },
    { text: 'Reserves', icon: <EventIcon />, content: 'Content for Reserves' },
  ];


 

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleFieldClick = (field) => {
    setSelectedContent(field.content);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          {fields.map((field, index) => (
            <ListItem button key={index} onClick={() => handleFieldClick(field)}>
              <ListItemIcon>{field.icon}</ListItemIcon>
              {open && <ListItemText primary={field.text} />}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <div className="Content">
        <div>{selectedContent}</div>
      </div>
    </>
  );
};

export default Sidebar;
