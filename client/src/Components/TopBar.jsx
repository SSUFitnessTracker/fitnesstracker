import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';


import LeftMenu from './LeftMenu'


function TopBar(props) {

    const [auth, setAuth] = React.useState(props.authenticated);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    return (
        <div>
            
            <AppBar position="static" style={{ background: '#212121'}} >
        <Toolbar>
          
          {auth ? 
          <LeftMenu />
          :
          <></>
          }


          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TrackFit
          </Typography>


          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
