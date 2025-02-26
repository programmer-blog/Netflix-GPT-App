import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from "react-redux";  
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";
import { LOGO, USER_AVTAR } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInform, setIsSignInForm] = useState(true)
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform)
  }
  const handleButtonClick = () => {
    const emailVal = email?.current?.value || "";
    const passwordVal = password?.current?.value || "";
    const nameVal = name?.current?.value || "";
    const photoURL= USER_AVTAR;
    const message = checkValidData(emailVal, passwordVal, nameVal, isSignInform);
    setErrorMessage(message);

    //Signin // Signup
    if(message) return;

    if(!isSignInform) {
      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: nameVal, photoURL: photoURL
        }).then(() => {
        }).catch((error) => {
          setErrorMessage(error.message)
        });
        const { uid, email } = auth.currentUser;
        dispatch(addUser({ uid:uid, email:email, displayName: nameVal, photoURL: photoURL})); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + '-' + errorMessage)
      });
    } else {
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid:uid, email:email, displayName: displayName, photoURL: photoURL}));         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage)
        });
    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
      <img 
      src={LOGO} 
      alt='logo'
      />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className=' text-white w-1/2 absolute p-12 bg-blue-300 my-36 mx-auto left-0 right-0'>
      <h1 className='font-bold text-3xl py-4'>{isSignInform ? 'Sign In': 'Sign Up' }</h1>
        <input ref={email} type='text' placeholder='Email Address' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />
        {!isSignInform && <input ref={name} type='text' placeholder='Full Name' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />}
        <input ref={password} type='password' placeholder='Password' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />
        <p className='text-red-500 font-bold text-lg py-2 px-1'>{errorMessage}</p>
        <button className='p-4 m-4 bg-amber-800 w-full' onClick={handleButtonClick}>{isSignInform ? 'Sign in': 'SignUp' }</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
        {!isSignInform ? 'Already Registered? Sign In now': 'Are you new to NetFlix? Signup Now' }
          </p>
      </form>
    </div>
  )
}

export default Login