import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Redirect, useHistory } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function ButtonAppBar() {
    const [state, setState] = React.useState(false);

    const history = useHistory();

    const redirect = (campo) => {
        history.push(campo);
    }
    const toggleDrawer = () => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(!state);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}


        //onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button onClick={() => redirect('/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button onClick={() => redirect('/movie')}>
                    <ListItemIcon>
                        <LocalMoviesIcon />
                    </ListItemIcon>
                    <ListItemText primary='Filmes' />
                </ListItem>

            </List>
        </Box>
    );
    return (
        <div>

            <Box
                //sx={{ flexGrow: 1 }}
            >
                <AppBar position="static" style={{ alignItems: 'stretch', justifyContent: 'center', marginBottom:50 }}>
                    <div className="row">
                        <div className="col-sm-8">

                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    //sx={{ mr: 2 }}
                                    onClick={toggleDrawer()}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Typography variant="h6" component="div" >
                                    Central IntPlay
                                </Typography>




                            </Toolbar>
                        </div>
                        <div className="col-sm-4" style={{ left: '25%' }}>
                            <Button color="inherit" onClick={() => redirect('/')}>Voltar</Button>
                        </div>
                    </div>
                </AppBar>
            </Box>

            <div>

                <React.Fragment>

                    <SwipeableDrawer
                        anchor='left'
                        open={state}
                        onClose={toggleDrawer()}
                        onOpen={toggleDrawer()}

                    >
                        {list()}
                    </SwipeableDrawer>
                </React.Fragment>

            </div>
        </div>
    );
}