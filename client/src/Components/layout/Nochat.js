import React from 'react'
import {  useSelector } from 'react-redux';
import { TiMessages } from "react-icons/ti";
import "./nochat.css"

const NoChatSelected = () => {
	

    const {loadUser} = useSelector((state)=>state.load);
    console.log(loadUser)
	return (
		<div className='Nochat'>
			<div className='Welcome'>
				<p>Welcome 👋 {loadUser&&loadUser.name} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='icons' />
			</div>
		</div>
	);
};

export default NoChatSelected