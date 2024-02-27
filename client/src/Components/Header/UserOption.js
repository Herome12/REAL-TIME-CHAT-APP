import React,{Fragment} from 'react'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';


const UserOption = ({user}) => {

    const navigate = useNavigate();


   
    const options = [
        {icon:<HomeIcon/>,name:"Home",func:home},
        
        { icon: <PersonIcon />, name: "Profile", func: account },
        
         { icon: <ExitToAppIcon />, name: "Logout", func: logout },
        
      ];
 

      if(user.role==="admin"){
        options.unshift({
            icon:<DashboardIcon/>,
            name:"Dashboard",
            func:dashboard
        })
      }
      
      function home(){
        navigate("/")
      }

      function account(){
        navigate("/account")
      }
      
      function logout(){
        navigate("/logout")
      }
    
 
 
    return (
     <Fragment>
        <SpeedDial
  ariaLabel="SpeedDial basic example"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  icon={<SpeedDialIcon />}
>
  {options.map((action) => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
    />
  ))}
</SpeedDial>
     </Fragment>
  )
}

export default UserOption