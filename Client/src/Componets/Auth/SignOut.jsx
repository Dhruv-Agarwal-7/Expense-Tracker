import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {signOut} from "../../Redux/User/userSlice";
import string from '../../String';

export const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        const response = await axios.get(`${string}/user/signout`, { withCredentials: true });
        dispatch(signOut());
        toast.success(response.data.message);
        navigate('/signin');
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/');
      }
    };

    signOutUser();
}, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Signing Out...</h1>
      </div>
    </div>
  );
};

export default SignOut;
