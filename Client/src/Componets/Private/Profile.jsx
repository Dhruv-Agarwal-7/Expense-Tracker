import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Redux/User/userSlice';
import toast from 'react-hot-toast';
import string from '../../String';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.user.username);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentUser.user.avatar);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    await handleUpdateAvatar(file);
  };

  const handleUpdateAvatar = async (photoFile) => {
    try {
      const formData = new FormData();
      formData.append('profilePhoto', photoFile); // Append the actual file object to FormData
  
      const { data } = await axios.put(`${string}/user/updateavatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      dispatch(updateUser(data));
      toast.success(data.message);
      navigate('/profile')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  

  const handleUpdateProfileDetails = async () => {
    try {
      const { data } = await axios.put(`${string}/user/updateprofile`, { username }, {
        withCredentials: true,
      });
      dispatch(updateUser(data));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (<>
  <div className="max-w-xl mx-auto mt-10 p-5 bg-green-50 shadow-xl rounded-lg m-10">
  <h2 className="text-3xl font-semibold text-center mb-5 text-green-800">Profile</h2>
    <div className="avatar-update">
      <div className="flex flex-col items-center mb-5">
        <img
          src={`${string}` + currentUser.user.avatar || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover mb-3 cursor-pointer"
          onClick={() => document.getElementById('profilePhotoInput').click()}
        />
        <input
          type="file"
          id="profilePhotoInput"
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
      </div>
    </div>
    <div className="profile-details-update">
      <div className="mb-5">
        <label className="block text-lg font-medium mb-2 text-green-800">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleUpdateProfileDetails}
        className="w-full bg-green-800 text-white py-2 rounded-md mb-3 hover:bg-green-700"
      >
        Update Profile
      </button>
    </div>
    </div></>
  );
};



































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUser, signOut } from '../../Redux/User/userSlice';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import string from '../../String';

// export const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser } = useSelector((state) => state.user);

//   const [username, setUsername] = useState(currentUser.user.username);
//   const [profilePhoto, setProfilePhoto] = useState(currentUser.user.avatar);
//   const [imagePreview, setImagePreview] = useState(currentUser.user.avatar);

//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     setProfilePhoto(file);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     await handleUpdateProfile(file);
//   };

//   const handleUpdateProfile = async (photoFile = null) => {
//     const formData = new FormData();
//     formData.append('username', username);
//     if (photoFile) {
//       formData.append('profilePhoto', photoFile);
//     }
//     try {
//         const {data} = await axios.put(`${string}/user/updateprofile`,
//             formData,
//             {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                 },
//                 withCredentials: true,
//             }
//         );
//         dispatch(updateUser(data));
//         toast.success(data.message);
//     } catch (error) {
//         toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
//       <h2 className="text-3xl font-semibold text-center mb-5">Profile</h2>
//       <div className="flex flex-col items-center mb-5">
//         <img
//           src={imagePreview || 'https://via.placeholder.com/150'}
//           alt="Profile"
//           className="rounded-full w-32 h-32 object-cover mb-3 cursor-pointer"
//           onClick={() => document.getElementById('profilePhotoInput').click()}
//         />
//         <input
//           type="file"
//           id="profilePhotoInput"
//           style={{ display: 'none' }}
//           onChange={handlePhotoChange}
//         />
//       </div>
//       <div className="mb-5">
//         <label className="block text-lg font-medium mb-2">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//         />
//       </div>
//       <button
//         onClick={() => handleUpdateProfile()}
//         className="w-full bg-green-500 text-white py-2 rounded-md mb-3"
//       >
//         Update Profile
//       </button>
//     </div>
//   );
// };

// export default Profile;
