import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import logo from './assets/logo.png'
import './styles.css'

const pages = [
    ['Shopping Mall', '/pet_market'],
    ['Personal Center', '/personal']
];

const Logo = () => {
  return (
    <img src={logo} alt="Logo" className="logo"/>
  );
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{
      backgroundColor: 'rgba(237,231,246, 0.2)',
      color: 'black'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
          {/* Logo for md */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, alignItems: 'center', display: { xs: 'none', md: 'flex' } }}
          >
            <Logo />
            &nbsp;&nbsp;&nbsp;
            <div>PET LOVE</div>
          </Typography>

          {/* Menu for xs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((arr) => (
                <Link to={arr[1]} style={{ textDecoration: 'none'}}>
                    <MenuItem key={arr[0]} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                            {arr[0]}
                        </Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
              
          {/* Logo for xs */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Logo />
          </Typography>
              
          {/* Title text for md */}
          <Box sx={{display: {xs: 'none', md: 'flex'}, color: 'gray', fontSize: 18}}>
            keep it with your lover
          </Box>


          {/* Menu for md */}
          <Box ml={2} sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(([page, link]) => (
                    <Link to={link} style={{ textDecoration: 'none' }}>
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, 
                              color: 'white', 
                              display: 'block', 
                              backgroundColor: 'rgba(33,182,174,0.8)',
                              '&:hover': {
                                backgroundColor: 'rgba(33,182,174,0.5)'
                              }}}
                        >
                            {page}   
                        </Button>
                    </Link>

            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
