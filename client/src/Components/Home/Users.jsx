import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Users.css'; 
import { Link } from "react-router-dom";
const Users = ({ user }) => {
  if (!user || !user.avatar || !user.avatar.url) {
    return null; 
  }

  return (
    <div className="users-container"> 
     <Link to={user._id}>
     <Avatar  alt="avatar" className='avatar' src={user && user.avatar.url} sx={{ width: 56, height: 56 }}/>
     
     </Link>
     
      <h1>{user&&user.name}</h1>
      
     
    </div>
  );
};

export default Users;
