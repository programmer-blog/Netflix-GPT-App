import React from 'react'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';

const Header = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignout = () => {
        signOut(auth)
        .then(() => {})
        .catch((error) => {
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/');
            }
          });
          return () => unsubscribe();
    }, []);

    return (
        <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img 
            className='w-44'
            alt="logo" src='https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460' />
        
        {user && (<div className='flex p-2'>
        <img className='w-12 h-12' src={user?.photoURL} />
        <button onClick={handleSignout} className='bg-red-500 cursor-pointer'>(Sign Out)</button>
        </div> )}      
        </div>
    )
}

export default Header