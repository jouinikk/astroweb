import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import image from '../../img/Webb-Telescope.jpg'
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Modal } from '@mui/material';
import { AppRegistration, LoginOutlined } from '@mui/icons-material';
import { redirect } from 'react-router-dom';
import {Alert} from '@mui/material';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://jouiniabderrahmen.web.app">
        Jouini Abderrahmen
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function SignInSide() {
  const[open,setOpen] = useState(false);
  const handleOpen = ()=>setOpen(true)
  const handleclose = ()=>setOpen(false)
  const authCtx = useContext(AuthContext);
  const [error,setError] = useState(false);
  const [errorRegister,setErrorRegister] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
    let email =  data.get('email')
    let password = data.get('password')
    try{
    await axios.post("http://localhost:8080/api/v1/auth/authenticate",{
      "email": email,
      "password": password
    },{headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json;charset=UTF-8',
      }}).then((response)=>{
            let token = response.data.token;
            const decoded = jwtDecode(token);
            console.log(decoded);
            const Responsedata={
            accessToken:token,  
            id : decoded.id,
            firstName : decoded.firstName,
            lastName : decoded.lastName,
            email : decoded.sub,
            role: decoded.role,
            bio: decoded.bio,
            profilePic:decoded.profilePic
          }
          console.log("farkes aal bio",response);
          authCtx.login(Responsedata)
        })
        }catch(e){
          setError(true)
        }
    }
  ;


  const handleSignUp = async(event)=>{
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      try{
        const response = await axios.post("http://localhost:8080/api/v1/auth/register",{
            "firstName":data.get('firstName'),
            "lastName":data.get('lastName'),
            "email": data.get('email'),
            "password": data.get('password'),
            "profilePic": data.get('profilePicPath')
        },{headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json;charset=UTF-8',
        }}).then((response)=>{
          if(response.status == 200){
            setTimeout(() => {
            handleclose()
          }, 3000 );
          }else{
           
          }
        })
        }catch(err){
          setErrorRegister(true)
        }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <Alert variant="filled" severity="error">
              TSomething went wrong!
            </Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Typography onClick={handleOpen} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open ={open}
        onClose={handleclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AppRegistration />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="profilePicPath"
                label="Profile Picture Path"
                name="profilePicPath"
                autoComplete="firstName"
                autoFocus
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="firstName"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="lastName"
                name="lastName"
                autoComplete="lastName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {errorRegister && 
              <Alert variant="filled" severity="error">
                TSomething went wrong!
              </Alert>
              }
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
     
      </Modal>
    </ThemeProvider>
  );
}