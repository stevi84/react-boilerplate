import { LanguageSwitch } from './LanguageSwitch';
import {
  AppBar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import EditNote from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import { getEnv } from '../../globals/Environments';

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" onClick={handleClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => navigate('/')}>
              <ListItemIcon>
                <Home fontSize="small" />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate('/todos')}>
              <ListItemIcon>
                <EditNote fontSize="small" />
              </ListItemIcon>
              <ListItemText>Todos</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => navigate('/users')}>
              <ListItemIcon>
                <People fontSize="small" />
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Boilerplate
          </Typography>
          <Typography variant="body1" component="div" sx={{ mr: 1 }}>
            Environment: {getEnv()}
          </Typography>
          <LanguageSwitch />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
