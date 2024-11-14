import React from 'react'
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import String from '../../String';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../Redux/User/userSlice';
import { OAuth } from './OAuth';

const SignIn = () => {
    const [formData, setFormData] = useState({});    
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please Provide Email and Password");
            return;
        }
        dispatch(signInStart());
        try{
            const {data} = await axios.post(`${String}/user/signin`,
                formData,
                {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            dispatch(signInSuccess(data));
            toast.success(data.message);
            navigate('/dashboard');
        }
        catch(error){
            dispatch(signInFailure(error.response.data.message));
            toast.error(error.response.data.message);
        }
    }
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }
  return (
    <>
        <div className='p-7 max-w-lg mx-auto bg-green-200 my-10 rounded-2xl'>
            <h1 className='text-3xl text-center text-green-800 font-semibold my-5'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='Email'
                    className='border p-3 rounded-lg text-green-900 font-medium'
                    id='email'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='border p-3 rounded-lg text-green-900 font-medium'
                    id='password'
                    onChange={handleChange}
                />
                <button type='submit'                    
                    className='bg-green-800 text-white p-3 rounded-lg text-2xl font-bold hover:opacity-90 disabled:opacity-80 my-2'
                    >
                    Sign In{/* {loading ? 'Loading...' : 'Sign In'} */}
                </button>
                <span className='text-center text-green-800 text-sm font-medium'>OR</span>
                <OAuth/>
            </form>
            <div className='flex gap-2 mt-5 justify-center'>
                <p>Don't have an account?</p>
                <Link to={'/signup'}>
                    <span className='text-blue-700'>Sign up</span>
                </Link>
            </div>
        </div>
    </>
  )
}

export default SignIn