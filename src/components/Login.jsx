import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";  
import { addUser } from "../utils/userSlice";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInform, setIsSignInForm] = useState(true)
  const navigate = useNavigate();  
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
    const photoURL= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHnW5KFKGIR9cemeR5n48brew3BmQ7-vb8fw&s";
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
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage('Profile: '+error.message)
        });
        const { uid, email } = auth.currentUser;
        dispatch(addUser({ uid:uid, email:email, displayName: nameVal, photoURL: photoURL})); 
        navigate("/browse");
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
        
          navigate("/browse");         
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
      src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs' 
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