import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform)
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
      <form className=' text-white w-1/2 absolute p-12 bg-black my-36 mx-auto left-0 right-0'>
      <h1 className='font-bold text-3xl py-4'>{isSignInform ? 'Sign In': 'Sign Up' }</h1>
        <input type='text' placeholder='Email Address' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />
           <input type='text' placeholder='Full Name' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />
        {!isSignInform && (<input type='password' placeholder='Password' 
          className='p-2 m-2 w-full bg-gray-50 text-black' />)}
        <button className='p-4 m-4 bg-amber-800 w-full'>{isSignInform ? 'Sign in': 'SignUp' }</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
        {isSignInform ? 'Already Registered Sign In now': 'Are you new to NetFlix? Signup Now' }
          </p>
      </form>
    </div>
  )
}

export default Login