import React from 'react'
import { app } from "../../firebase";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import String from '../../String';
import { signInSuccess } from '../../Redux/User/userSlice';
import toast from 'react-hot-toast';

export const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async(e) => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const {data} = await axios.post(`${String}/user/google`, 
                {
                    username: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            dispatch(signInSuccess(data));
            navigate('/dashboard');
          } catch (error) {
            console.log(error);
            toast.success(error.response.data.message);
          }
    }
  return (
    <button type='button' onClick={handleGoogleClick}
        className='flex justify-center items-center bg-gray-100 p-3 rounded-lg text-lg font-bold hover:opacity-90 disabled:opacity-80'
    >
        <FcGoogle className='text-2xl mx-2'/> 
        <span>Continue With Google</span>
    </button>
  )
}

