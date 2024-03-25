import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { Redirect } from 'react-router-dom';
import "./login.css";
import Image from "../assets/image.png"

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
        setLoggedIn(true); // Set loggedIn to true after successful sign-in
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
      });
  };

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const email = userCredential.user.email;
        localStorage.setItem('email', email);
        setUser(email);
        setLoggedIn(true); // Set loggedIn to true after successful sign-in
      })
      .catch((error) => {
        console.error('Email Sign-in Error:', error);
      });
  };

  // Redirect to SyllabusList if loggedIn is true
  if (loggedIn) {
    return <Redirect to="/syllabus" />;
  }

  return (
    <div>
      {user ? (
        <Redirect to="/syllabus" /> // Redirect immediately if user is already logged in
      ) : (
        <>
          <div className='login__container'>
            <div className='login__content'>
              <div className='login__welcome'>
                <h1 className='login__title'>Welcome</h1>
                <p className='login__sologan'>We are glad see you bock with us</p>
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

                <button className='login__btn-choice' onClick={handleGoogleSignIn}><i class="bi bi-google"></i> Sign in with Google</button>
              </div>
              <div className='login__image'>
                <img src={Image} className='image__welcome'></img>
              </div>
            </div>
          </div>











        </>
      )}
    </div>
  );
};

export default Login;
