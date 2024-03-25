import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import SyllabusList from '../other/Others';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      })
      .catch((error) => {
        console.error('Email Sign-in Error:', error);
      });
  };

  return (
    <div>
      {user ? (
        <SyllabusList />
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleEmailSignIn}>Sign in with Email</button>
        </>
      )}
    </div>
  );
};

export default Login;
