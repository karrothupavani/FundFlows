import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Paper,  Avatar ,Grid} from '@mui/material';
// import {AccountCircleIcon} from '@mui/icons-material/AccountCircle';
import { HomeMaxOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '','','']);
  const [otpError,setOtpError]=useState(false)
  const [sessionID,setSessionID]=useState('')

  const Navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  const handleRequestOTP = async () => {
    if (!username.trim()) {
      setUsernameError('Enter Username');
      return;
    }
    if (!validateEmail(username)) {
      setUsernameError('Invalid email format');
      return;
    }
  
    try {
      const response = await axios.post(`https://api.p360.build:9003/v1/user/authenticateUser/${username}`);
      setSessionID(response.data.sessionId);
      localStorage.setItem('sessionID', response.data.sessionId); 
      localStorage.setItem('accessToken',response.data.accessToken);
      // localStorage.setItem
      setOtpRequested(true);
    } catch (error) {
      setUsernameError('Email is not verified');
     
      console.error('Error requesting OTP:', error);
    }
  };

  const handleLogin = async () => {
    const enteredOtp = otp.join('');
    console.log(username);
    console.log(enteredOtp);
    console.log(sessionID);
    try {
        const response = await axios.post('https://api.p360.build:9003/v1/user/respondToAuthChallenge', {
        email:username,
        session: sessionID,
        confirmationCode: enteredOtp,
      });
      localStorage.setItem('accessToken', response.data.accessToken); 
      localStorage.setItem('idToken',response.data.idToken);
      // const name = username.split('@')[0]
      localStorage.setItem('email',username); 

      alert(`Sussessfully Submitted:  \n USER NAME:${username} \n OTP:${enteredOtp}`)
      Navigate('/Home');
    } catch (error) {
      setOtpError('Enter Valid OTP')
      console.error('Error submitting OTP:', error);
    }
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
    borderRadius:"20px",
    marginLeft:"-100%",
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
    backgroundImage:"linear-gradient(to right, rgba(110, 208, 250, 0.5), rgba(126, 247, 238))"
  };
  const otpInputStyle = {
    textAlign: 'center',
    fontSize: '1rem',
    width: '30px',
    padding: '5px',
    border: '1px solid #ccc', 
    borderRadius: '4px',
    appearance: 'none', 
    MozAppearance: 'textfield', 
  }
  return (
    <div style={{ display: 'flex', backgroundImage: "linear-gradient(to right, rgba(138, 210, 255), rgba(126, 247, 238,0.3))", height: "100vh" }}>
      <div style={{ display: 'flex', width: "100%", height: "90%", backgroundColor: 'white', margin: "3%", borderRadius: 20, boxShadow: "2px 2px 10px 2px #8ad2ff" }}>
        <div
          style={{
            width: '60%',
            backgroundImage: "linear-gradient(to right, rgba(110, 208, 250, 0.3), rgba(126, 247, 238, 0.3)), url('https://www.pngitem.com/pimgs/m/161-1618507_financial-data-processing-icon-hd-png-download.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: 'blue',
            borderRadius: "10px"
          }}
        >
          {/* Left box */}
        </div>
        <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          {/* Right box */}
          <div style={containerStyle}>
            <Paper elevation={6} style={paperStyle}>
              <Avatar style={avatarStyle}>
                {/* <AccountCircleIcon fontSize="large" /> */}
              </Avatar>
              <h2 style={{ color: "#0271e8" }}>Login</h2>

              {!otpRequested ? (
                <>
                  <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    size='small'
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError('');
                    }}
                  />
                  {usernameError && (
                    <Typography variant="caption" color="error">
                      {usernameError}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    style={buttonStyle}
                    onClick={() => {
                      // Request OTP and set otpRequested to true
                      handleRequestOTP();
                    }}
                  >
                    Request OTP
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Grid container spacing={0.5}>
                      {otp.map((digit, index) => (
                        <Grid item xs={2} key={index}>
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
                              if (index < 5 && e.target.value !== '') {
                                inputRefs.current[index + 1].current.focus();
                              }
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                  {otpError && (
                    <Typography variant="caption" color="error">
                      {otpError}
                    </Typography>
                  )}
                  <Grid>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      style={buttonStyle}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Grid>
                </>
              )}
            </Paper>
          </div>
          <svg width="80%" height="80%">
            <circle cx="100%" cy="50%" r="50%" stroke="#2ba3ff" strokeWidth="0.5" fill="white" />
            <circle cx="45%" cy="40%" r="5%" stroke="#2ba3ff" strokeWidth="0.5" fill="#bdfcf9" />
            <circle cx="100%" cy="50%" r="40%" stroke="#2ba3ff" strokeWidth="0.5" fill="white" />
            <circle cx="74%" cy="80%" r="3%" stroke="#2ba3ff" strokeWidth="0.5" fill="#bdfcf9" />
            <circle cx="100%" cy="50%" r="30%" stroke="#2ba3ff" strokeWidth="0" fill="#bdfcf9" />
            <circle cx="100%" cy="50%" r="20%" stroke="#2ba3ff" strokeWidth="0" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
