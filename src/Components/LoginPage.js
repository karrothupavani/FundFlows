import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled('div')({
  display: 'flex',
  backgroundColor:'#ebfcfc',
  width:"100%",
  height:"100%"
});

const LeftContainer = styled('div')({
  // opacity: '40%',
  backgroundColor: '#b8ffff',
  width: '50%',
  height: '95vh',
  // borderBottomRightRadius: 500,
  borderStartEndRadius: 500,
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  
});

const LogoContainer = styled('div')({
  width: '100%',
  height: '100%',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // textAlign:"center"
});

const Circle = styled('div')({
  width: '10%',
  height: '10%',
  backgroundColor: '#ebfcfc',
  borderRadius: '50%',
  
});

const SmallCircle = styled('div')({
  width: '15%',
  height: '15%',
  backgroundColor: '#ebfcfc',
  borderRadius: '50%',
  marginLeft:"70%"
});

const SmallestCircle = styled('div')({
  width: '10%',
  height: '10%',
  backgroundColor: '#ebfcfc',
  borderRadius: '50%',
  marginLeft:"30%",
});

const RightContainer = styled('div')({
  width: '50%',
  height: '95vh',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  
});
const BackgroundBox = styled(Box)({
  width: '50%',
  height: '50%',
  marginInline:"30%",
  marginBlock:"-25%",
  alignContent:"center"
});




const LoginPage = () => {
 const Navigate = useNavigate();
const [mail,setMail]=useState("");
const [password,setPassword]=useState("");
const [mailError,setMailError]=useState("");
const [passwordError,setPasswordError]=useState("");

    const handleSubmit =()=>{
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (mail === ""    &&   password === "") {
          setMailError("Please Enter Your UserName");
          setPasswordError("Please enter your Password");
          return false;
        } 
        else if (!emailValid.test(mail)) {
          setMailError("Please Enter valid UserName");
          return false;
        }else if(password === ""){
          setPasswordError("Please enter your Password");
        }
          else {
          setMailError("");
          setPasswordError("");
          console.log("Username: " + mail, "\n", "Password : " + password);
          Navigate("/Home");
        }
     };

     const ifUserChange=(event)=>{
        setMail(event.target.value);
     }
     const ifPasswordChange=(event)=>{
        setPassword(event.target.value);
     }
     return(
  <AppContainer>
    <LeftContainer>
      <LogoContainer>
        <Circle />
        <SmallCircle /> 
        <SmallestCircle />
        <BackgroundBox >
        <SmallestCircle />
        <Typography variant="h5">Piersoft</Typography>
        <img src='https://www.transparentpng.com/thumb/finance/TpPTTh-finance-png-picture.png' alt='cv' width="40%" height="60%" 
        style={{position:"absolute",marginLeft:"-10%"}}></img>
       {/* <Box width="50%" height="50%" textAlign="center" marginTop="20%" > 
       <Typography   >
           At Piersoft,
         we specialise in providing end-to-end digital 
         transformation services 
          to businesses of all sizes, 
          across various industries</Typography></Box> */}
          </BackgroundBox>
          <Circle style={{marginLeft:"80%",marginTop:10}}/>
          <SmallestCircle style={{marginLeft:40,marginTop:230}} />
      </LogoContainer>
      
    </LeftContainer>
    <RightContainer>
      <StyledBox>
        <Typography variant="h5">Login</Typography>
        <TextField size="small" label="User Name" sx={{ margin: 2 }} type='email' variant='outlined' 
         InputLabelProps={{ style: { fontSize: '12px', textAlign: 'center' } }}
         error={mailError && mailError.length ? true : false} 
         onChange={ifUserChange}
         value={mail} helperText={mailError} required />
        <TextField size="small" label="Password" sx={{ margin: "0px 12px 12px 12px" }} type='password' variant='outlined' 
        InputLabelProps={{ style: { fontSize: '12px', textAlign: 'center' } }} 
        error={passwordError && passwordError.length ? true:false}
        value={password} onChange={ifPasswordChange}
        helperText={passwordError}
        required />
        <Button variant="contained" sx={{ backgroundColor: '#a2f2fc' }} size='small' onClick={handleSubmit}>
          Submit
        </Button>
      </StyledBox>
    </RightContainer>
  </AppContainer>
)};

export default LoginPage;
