import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Users.css'; // Import the CSS file

const Users = ({ user }) => {
  if (!user || !user.avatar || !user.avatar.url) {
    return null; 
  }

  return (
    <div className="users-container"> 
      <Avatar alt="avatar" className='avatar' src={user && user.avatar.url} />
      <h1>{user&&user.name}</h1>
     
    </div>
  );
};

export default Users;
