import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


function LeftMenu() {


    const [anchorLeft, setAnchorLeft] = React.useState(null);
    const openLeft = Boolean(anchorLeft);


    const handleMenuLeft = (event) => {
        setAnchorLeft(event.currentTarget);
      };

    const handleCloseLeft = () => {
      setAnchorLeft(null);
    };

    return (
        <div>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
            <MenuIcon onClick={handleMenuLeft}>
            </MenuIcon>
            <Menu
        id="basic-menu"
        anchorEl={anchorLeft}
        open={openLeft}
        onClose={handleCloseLeft}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseLeft}>Profile</MenuItem>
        <MenuItem onClick={handleCloseLeft}>My account</MenuItem>
        <MenuItem onClick={handleCloseLeft}>Logout</MenuItem>
      </Menu>

          </IconButton>
        </div>
    )
}

export default LeftMenu
