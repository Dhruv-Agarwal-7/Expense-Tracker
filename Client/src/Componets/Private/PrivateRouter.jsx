import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import String from "../../String";  // Ensure this is correctly imported and holds the base URL
import { signOut } from '../../Redux/User/userSlice';

export const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${String}/user/protectedRoute`, { withCredentials: true });
      } catch (error) {
        if(error.response.data.success === false){                
          dispatch(signOut());
          toast.error('Session expired, please sign in again.');
          navigate('/signin');
        }
      }
    };

    if (currentUser) {
      checkAuth();
    }
  }, [currentUser, dispatch, navigate]);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};
