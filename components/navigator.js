import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import styles from './navigator.module.css';
import { makeStyles } from '@material-ui/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
    drawerPaper: {
      marginTop: "64px"
    }
});

const AppNavigator = ({selected, onScrollTo}) => {

    const classes = useStyles();
    const [ isOpenDrawer, setOpenDrawer ] = useState(false);

    const list = () => (
        <div
          style={{width: 'auto'}}
          role="presentation"
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
    );

    return (
        <div style={{width: '100%'}}>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={() => setOpenDrawer(!isOpenDrawer)}/>
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        UDP Solution
                    </Typography>
                    <div className='link'>
                       {/* <Link
                          onClick={() => onScrollTo('technology')}
                          style={{color: selected === 'technology' ? 'red' : 'white', marginLeft: 24}}
                        >
                       Technology
                        </Link> */}
                        
                        <Link
                          onClick={() => onScrollTo('about')}
                          style={{color: selected === 'about' ? 'grey' : 'white', marginLeft: 24}}
                        >
                       About
                        </Link>
                        {/* <Link onClick={() => onScrollTo('about')} style={{color: selected === 'about' ? 'red' : 'white', marginLeft: 24}}>
                          About
                        </Link> */}
                        <Link onClick={() => onScrollTo('solutions')} style={{color: selected === 'solutions' ? 'grey' : 'white', marginLeft: 24}}>
                          Product
                        </Link>
                        <Link onClick={() => onScrollTo('team')} style={{color: selected === 'team' ? 'grey' : 'white', marginLeft: 24}}>
                          Team
                        </Link>
                        <Link onClick={() => onScrollTo('contact')} style={{color: selected === 'contact' ? 'grey' : 'white', marginLeft: 24}}>
                          Contact
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                classes={{
                    paper: classes.drawerPaper
                }}
                style={{zIndex: 1}}
                anchor='top'
                open={isOpenDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                {list()}
            </Drawer>

            <style jsx>
                {
                    `
                    .link{
                        display: flex;
                        flex-direction: row;
                    }

                    @media(max-width: 600px){
                        .link{
                            display: none;
                        }
                    }
                    `
                }
            </style>
        </div>
    )
}

export default AppNavigator;