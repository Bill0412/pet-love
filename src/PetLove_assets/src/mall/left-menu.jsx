import * as React from "react";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const LeftMenu = () => {
    return (
      <Paper>
        <MenuList dense>
          <MenuItem>
            <ListItemText inset>Pet Market</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText inset>Random Pet</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }

  export default LeftMenu;