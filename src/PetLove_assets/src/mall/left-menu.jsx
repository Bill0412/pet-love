import * as React from "react";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const LeftMenu = () => {
    return (
      <Paper>
        <MenuList dense>
          <Link to="/pet_market" style={{ textDecoration: 'none' }}>
            <MenuItem>
              <ListItemText inset>
                  Pet Market
              </ListItemText>
            </MenuItem>
          </Link>
          <Link to="/random_pet" style={{ textDecoration: 'none' }}>
            <MenuItem>
              <ListItemText inset>Random Pet</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Paper>
    );
  }

  export default LeftMenu;