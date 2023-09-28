import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// import { Home } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const  Navigate = useNavigate();
    const logOut=()=>{
        Navigate('/');
    }
  return (
    <div>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KMV
          </Typography>
          
          {/* Home Button */}
          <IconButton color="inherit" onClick={logOut}>
            <LogoutIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Rest of your app */}
    </div>
  );
};

export default Header;
