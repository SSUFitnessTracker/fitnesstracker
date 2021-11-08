import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import {useSelector} from 'react-redux'; 
import axios from 'axios';
import { useHistory } from "react-router-dom";

import LeftMenu from './LeftMenu'


function TopBar(props) {
    let history = useHistory();
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;

    // const [auth, setAuth] = React.useState(props.authenticated);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = async () => {
      try {
        await axios.post('/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.reload(false);
      } catch (error) {
        window.location.href="/";
      }
    }


    return (
        <div>
            
            <AppBar position="static" style={{ background: '#212121'}} >
        <Toolbar>
          
          {/* {isLogged ? 
          <LeftMenu />
          :
          <></>
          } */}

          <RunCircleIcon  />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{marginLeft: '10px'}}>
            TrackFit
          </Typography>


          {isLogged ? (
            <div >

                <img onClick={handleMenu} style={{cursor: 'pointer', borderRadius: "50% 50% 50% 50%", width: '50px', height: '50px'}} src={user.avatar} alt=""></img>
                {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               </IconButton> */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>
              </Menu>
            </div>
          ) : 
           <div>
            <Button variant="contained" style={{background: '#5B70A3', color:'white'}} onClick={props.onPress}>Sign In</Button>
           </div>    }
        </Toolbar>
      </AppBar>


        </div>
    )
}

export default TopBar
