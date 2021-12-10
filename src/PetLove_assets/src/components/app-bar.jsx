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

const Logo = () => {
  return (
    <img src={logo} alt="Logo" className="logo"/>
  );
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorMarket, setAnchorMarket] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenMarketMenu = (event) => {
    setAnchorMarket(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseMarketMenu = (event) => {
    setAnchorMarket(null);
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
             <Link to='/pet_market' style={{ textDecoration: 'none'}}>
                  <MenuItem key='Pet Market' onClick={handleCloseNavMenu} 
                    style={{ textDecoration: 'none', color: 'rgba(33,182,174,1.0)' }}>
                      <Typography textAlign="center">
                        Pet Market
                      </Typography>
                  </MenuItem>
              </Link>
              <Link to='/random_pet' style={{ textDecoration: 'none'}}>
                  <MenuItem key='Random Pet' onClick={handleCloseNavMenu}
                    style={{ textDecoration: 'none', color: 'rgba(33,182,174,1.0)' }}>
                      <Typography textAlign="center">
                        Random Pet
                      </Typography>
                  </MenuItem>
              </Link> 
              <Link to='/personal' style={{ textDecoration: 'none'}}>
                  <MenuItem key='Personal Center' onClick={handleCloseNavMenu}
                    style={{ textDecoration: 'none', color: 'rgba(33,182,174,1.0)' }}>
                      <Typography textAlign="center">
                        Personal Center
                      </Typography>
                  </MenuItem>
              </Link>
            </Menu>
          </Box>
              
          {/* Logo for xs */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}
          >
            <Logo />
          </Typography>
              
          {/* Title text for md */}
          <Box sx={{display: {xs: 'none', md: 'flex'}, color: 'gray', fontSize: 18}}>
            keep it with your lover
          </Box>

          {/* Menu for md */}
          <Box ml={2} sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
                key='Shopping Mall'
                onClick={handleOpenMarketMenu}
                sx={{ my: 2, 
                  color: 'white', 
                  display: 'block', 
                  backgroundColor: 'rgba(33,182,174,0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(33,182,174,0.5)'
                  }}}
            >
              Shopping Mall
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorMarket}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorMarket)}
              onClose={handleCloseMarketMenu}
            >
              <Link to="/pet_market" style={{ textDecoration: 'none', color: 'rgba(33,182,174,1.0)' }}>
                <MenuItem key="text" onClick={handleCloseMarketMenu}>
                  <Typography textAlign="center">Pet Market</Typography>
                </MenuItem>
              </Link>
              <Link to="/random_pet" style={{ textDecoration: 'none', color: 'rgba(33,182,174,1.0)' }}> 
                <MenuItem key="text" onClick={handleCloseMarketMenu}>
                  <Typography textAlign="center">Random Pet</Typography>
                </MenuItem>
              </Link>
            </Menu>
            &nbsp;&nbsp;
              <Link to='/personal' style={{ textDecoration: 'none' }}>
                  <Button
                      key='Personal Center'
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, 
                        color: 'white', 
                        display: 'block', 
                        backgroundColor: 'rgba(33,182,174,0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(33,182,174,0.5)'
                        }}}
                  >
                    Personal Center
                  </Button>
              </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
