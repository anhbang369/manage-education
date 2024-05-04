import { useEffect, useState } from 'react';
import * as React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { Redirect } from 'react-router-dom';
import Image from "../../assets/image.png";
import { authAPI } from "../../services/AuthService";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUser(email);
    }
  }, []);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        localStorage.setItem('email', email);
        setUser(email);
        result.user.getIdToken()
          .then((token) => {
            authAPI({ token })
              .then((data) => {
                if (data && data.access_token) {
                  const accessToken = data.access_token;
                  console.log('Access Token:', accessToken);
                  localStorage.setItem('jwt', accessToken);
                } else {
                  console.error('Access token not found in response data.');
                }
                setLoggedIn(true);
              })
              .catch((error) => {
                console.error('Error calling authAPI:', error);
              });
          })
          .catch((error) => {
            console.error('Error getting token:', error);
          });
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
      });
  };

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user.getIdToken()
          .then((token) => {
            authAPI({ token })
              .then((data) => {
                if (data && data.access_token) {
                  const accessToken = data.access_token;
                  console.log('Access Token:', accessToken);
                  localStorage.setItem('jwt', accessToken);
                } else {
                  console.error('Access token not found in response data.');
                }
                setLoggedIn(true);
              })
              .catch((error) => {
                console.error('Error calling authAPI:', error);
              });
          })
          .catch((error) => {
            console.error('Error getting token:', error);
          });
      })
      .catch((error) => {
        console.error('Email Sign-in Error:', error);
      });
  };

  // Redirect to SyllabusList if loggedIn is true
  if (loggedIn) {
    return <Redirect to="/syllabus" />;
  }

  const paperStyle = { padding: 20, height: '75vh', width: '70vw', margin: '50px auto' }
  return (
    <div>
      {user ? (
        <Redirect to="/syllabus" /> // Redirect immediately if user is already logged in
      ) : (
        <React.Fragment sx={{ bgcolor: '#FFF' }}>
          <CssBaseline />
          <Container className='text-white' fixed sx={{ bgcolor: '#FFF', height: '100vh', width: '100vw', margin: '0px' }}>
            <Box sx={{ bgcolor: '#FFF', height: '100vh', width: '100vw', margin: '0px' }}>
              <Grid className='border border-black rounded' style={paperStyle} sx={{ bgcolor: '#2d3748' }} >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography className='text-center fw-bold' variant="h2">
                        Welcome
                      </Typography>
                      <Typography className='text-center fs-14' variant="subtitle2">We are glad see you bock with us</Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField className='mt-4 w-100' label="Email" size='small' required value={email} onChange={(e) => setEmail(e.target.value)} />
                          </Grid>
                          <Grid item xs={2}>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField type='password' className='mt-4 w-100' label="Password" size='small' required value={password} onChange={(e) => setPassword(e.target.value)} />                      </Grid>
                          <Grid item xs={2}>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                          </Grid>
                          <Grid item xs={5}>
                            <FormGroup>
                              <FormControlLabel className='fs-10' control={<Checkbox defaultChecked />} label="Remember me" />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={5}>
                            <FormGroup>
                              <Typography className='mt-2 fs-6'>
                                Forgot Password
                              </Typography>
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={2}>
                          </Grid>
                          <Grid item xs={8}>
                            <Button onClick={handleEmailSignIn} color='primary' className='w-100 bg-core text-white' variant="contained" size="large">
                              Sign in
                            </Button>
                          </Grid>
                          <Grid item xs={2}>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography className='mt-2 fs-14 text-center' variant="subtitle1">
                        Dont have an account? <b>Sign Up</b>
                      </Typography>
                      <Typography className='mt-2 fs-14 text-center' variant="subtitle1">
                        Login with others
                      </Typography>
                      <Box sx={{ flexGrow: 1, marginTop: '10px' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={3}>

                          </Grid>
                          <Grid item xs={7}>
                            <Button color='info' variant='contained' className='text-white' onClick={handleGoogleSignIn}><i class="bi bi-google"></i> Sign in with Google</Button>
                          </Grid>
                          <Grid item xs={2}>

                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <img src={Image} alt="Welcome" style={{ width: '100%', height: '100%' }} />
                    </Grid>
                  </Grid>
                </Box>


                {/* <Typography className='text-center fw-bold' variant="h2">
              Welcome
            </Typography>
            <Typography className='text-center fs-14' variant="subtitle2">We are glad see you bock with us</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                  <TextField className='mt-4' label="Email" size='small' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                  <TextField type='password' className='mt-4' label="Password" size='small' required value={password} onChange={(e) => setPassword(e.target.value)} />                      </Grid>
                <Grid item xs={2}>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel className='fs-14' control={<Checkbox defaultChecked />} label="Remember me" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <Typography className='mt-2 fs-14' variant="subtitle1">
                      Forgot Password
                    </Typography>
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                  <Button onClick={handleEmailSignIn} color='primary' className='w-100 bg-core text-white' variant="contained" size="large">
                    Sign in
                  </Button>
                </Grid>
                <Grid item xs={2}>
                </Grid>
              </Grid>
            </Box>
            <Typography className='mt-2 fs-14 text-center' variant="subtitle1">
              Dont have an account? <b>Sign Up</b>
            </Typography>
            <Typography className='mt-2 fs-14 text-center' variant="subtitle1">
              Login with others
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={7}>
                  <Button color='info' variant='contained' className='text-black' onClick={handleGoogleSignIn}><i class="bi bi-google"></i> Sign in with Google</Button>
                </Grid>
                <Grid item xs={2}>

                </Grid>
              </Grid>
            </Box> */}
                {/* <div className='login__container'>
              <div className='login__content'>
                <div className='login__welcome'>
                  <input className='login__input'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div>
                    <input className='login__input'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='login__remember'>
                    <div>
                      <p><input type='checkbox'></input> Remember me</p>
                    </div>
                    <div>
                      <p>Forgot Password</p>
                    </div>
                  </div>
                  <div>
                    <button className='login__btn' onClick={handleEmailSignIn}>Sign in</button>
                  </div>
                  <div className='login__signup'>
                    <p>Dont have an account? <b><a>Sign Up</a></b></p>
                  </div>
                  <p className='login__choice'>Login with others</p>
                  ed
                  <button className='login__btn-choice' onClick={handleGoogleSignIn}><i class="bi bi-google"></i> Sign in with Google</button>
                </div>
                <div className='login__image'>
                  <img src={Image} className='image__welcome'></img>
                </div>
              </div>
            </div> */}
              </Grid>
            </Box>
          </Container>
        </React.Fragment>

      )}
    </div>
  );
};

export default Login;
