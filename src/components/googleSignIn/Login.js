import React, { useEffect } from 'react';
import { useState } from 'react';
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import SyllabusList from "../other/Others";

const Login = () => {

  const [value, setValue] = useState('')
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }

  useEffect(() => {
    setValue(localStorage.getItem('email'))
  })

  return (
    <div>
      {value ? <SyllabusList /> : <button onClick={handleClick}>Sign in google</button>}

    </div>
  )
}

export default Login