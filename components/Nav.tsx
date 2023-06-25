import router from 'next/router';
import { magic } from '../utils/magic';
import { useContext, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Home from './Home';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import Create from './Create';

const Nav = ({ tabs, setTab }) => {
  const [user, setUser] = useContext(UserContext);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [hideDrawer, setHideDrawer] = useState(false);
  const [currentView, setCurrentView] = useState(<Home />);
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const logout = () => {
    if (!magic) return console.error('Magic not initialized');
    // Call Magic's logout method, reset the user state, and route to the login page
    magic.user.logout().then(() => {
      setUser({ user: null });
      router.push('/');
    });
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const ViewSelect = ({ views, setCurrentView }: any) => (
    <>
      {Object.keys(views).map((key: string, index: number) => {
        const view = views[key];
        return (
          <ListItem key={view.text} style={{ marginBottom: 8 }}>
            <ListItemButton onClick={() => setTab(view.destination)}>
              <ListItemIcon>{view.icon}</ListItemIcon>
              <ListItemText primary={view.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );

  const appViews = {
    Home: {
      text: 'Home',
      icon: <HomeIcon color={'primary'} />,
      destination: 'home',
    },
    Create: {
      text: 'Create',
      icon: <AddBoxIcon color={'primary'} />,
      destination: 'create',
    },
    Settings: { text: 'Settings', icon: <SettingsIcon color={'primary'} /> },
  };
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container>
        <Typography component="h1" variant="h3" marginY={4} color={'primary'}>
          hello
        </Typography>
      </Container>
      <Divider />
      <List>
        <ViewSelect views={appViews} setCurrentView={setCurrentView} />
      </List>
    </Box>
  );

  return (
    <>
      {/* ----- NAVIGATION ----- */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon open={false} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Jenny
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {}}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* ----- APP DRAWER ----- */}
      {hideDrawer ? null : (
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      )}
    </>
  );
};

export default Nav;
