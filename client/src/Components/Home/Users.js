import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../action/UserAction';

import './Users.css';

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.AllUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
   <>
   {users&&users.map((value,index)=>(
     <div className="users-container">
     {users && (
       <Link to={`/user/${value._id}`}>
         <Avatar
           alt="avatar"
           className='avatar'
           src={value.avatar && value.avatar.url}
           sx={{ width: 56, height: 56 }}
         />
       </Link>
     )}
     <div className="user-details">
       {value && <h1>{value.name}</h1>}
     </div>
   </div>
   ))}
   </>
  );
};

export default Users;
