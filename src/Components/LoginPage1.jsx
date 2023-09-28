import React, { useState, useRef } from 'react';
import { Button, Paper, Avatar, Grid, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


function App() {
  const [username, setUsername] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const Navigate = useNavigate();
//   const [otpSentMessage, setOtpSentMessage] = useState('');

  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));

  const handleRequestOTP = () => {
    const fakeOtp = Math.floor(1000 + Math.random() * 9000); // Generate a random OTP
    // setOtpSentMessage(`OTP sent to ${username}`);
    setOtpRequested(true);
    setOtp(fakeOtp.toString().split(''));
  };

  const handleResendOTP = () => {
    const fakeOtp = Math.floor(1000 + Math.random() * 9000); // Generate a new random OTP
    // setOtpSentMessage(`OTP resent to ${username}`);
    setOtp(fakeOtp.toString().split(''));
  };

  const handleLogin = () => {
    // Here you can add your login logic
    // For now, let's just display the entered username and OTP
    const enteredOtp = otp.join('');
    alert(`Username: ${username}\nOTP: ${enteredOtp}`);
    Navigate('/Home')
  };

  
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const paperStyle = {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:"20px"
  };

  const avatarStyle = {
    backgroundColor: '#1563e6',
    border: '5px solid #fff',
    margin: '-40px auto 10px auto',
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
  };

  const buttonStyle = {
    marginTop: 20,
    marginRight:10,
  };
  const otpInputStyle = {
    textAlign: 'center',
    fontSize: '1rem',
    width: '20px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    appearance: 'none', // Hide spinner controls on number input
    MozAppearance: 'textfield', 
  };

  return (
    <div style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Avatar style={avatarStyle}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
        <h2>Login</h2>
       
        
        {!otpRequested ? (
            <>
             <TextField
          label="Username"
          variant="outlined"
          
          margin="normal"
          size='small'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={handleRequestOTP}
          >
            Request OTP
          </Button></>     
            ) : (
          <>
           <Grid container spacing={1}>
          {otp.map((digit, index) => (
            <Grid item xs={3} key={index}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                min="0"
                max="9"
                style={otpInputStyle}
                ref={inputRefs.current[index]}
                value={digit}
                onFocus={() => inputRefs.current[index].current.select()}
                onChange={(e) => {
                  const newOtp = [...otp];
                  newOtp[index] = e.target.value;
                  setOtp(newOtp);
                  if (index < 3 && e.target.value !== '') {
                    inputRefs.current[index + 1].current.focus();
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid >
            <Button
              variant="text"
              color="primary"
              style={buttonStyle}
              onClick={handleResendOTP}
            >
              Resend OTP
            </Button>       
        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          onClick={handleLogin}
        >
          Login
        </Button></Grid>
        </> 
        )}
      </Paper>
    </div>
  );
}

export default App;
