import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import styles from "../styles/Header.module.css";
import stylesMenu from "../styles/NavBarProfileMenu.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from './../contexts/AuthContext';
import { logoutAction } from '../redux/actions/userActions';
import { useDispatch } from "react-redux"

export default function NavBarProfileMenu() {
    let location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [border, setBorder] = useState(false);
    const open = Boolean(anchorEl);
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setBorder(true);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setBorder(false);
        setAnchorEl(null);
    };
    async function handleLogout() {
        setError("");
        dispatch(logoutAction);

        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (e) {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <div onClick={handleClick}>
                <img src="../images/icons/profile.png" alt="profile pic" className={location.pathname === "/my-profile" ? styles.headerIconClicked : styles.headerIcon}/>
            </div>
            {/* border ? styles.headerIconClicked : styles.headerIcon */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    style: {
                        width: 230,
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 15
                        },
                        '& .MuiList-root': {
                            padding: 0
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 7,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        },
                        
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to="/my-profile" style={{ textDecoration: 'none' }}>
                    <MenuItem className={stylesMenu.MenuItem}>
                        <img src="../images/icons/profile-2.png" alt="profile icon" className={stylesMenu.menuIcons}/> <p className={stylesMenu.MenuTitle}>Profile</p>
                    </MenuItem>
                </Link>
                {/* TODO: change links */}
                <Link to="/my-profile" style={{ textDecoration: 'none' }}>
                    <MenuItem className={stylesMenu.MenuItem}>
                        <img src="../images/icons/non-saved.png" alt="saved icon" className={stylesMenu.menuIcons}/> <p className={stylesMenu.MenuTitle}>Saved</p>
                    </MenuItem>
                </Link>
                <Link to="/edit" style={{ textDecoration: 'none' }}>
                    <MenuItem className={stylesMenu.MenuItem}>
                        <img src="../images/icons/settings.png" alt=" icon" className={stylesMenu.menuIcons}/> <p className={stylesMenu.MenuTitle}>Settings</p>
                    </MenuItem>
                </Link>
                <Link to="/my-profile" style={{ textDecoration: 'none' }}>
                    <MenuItem className={stylesMenu.MenuItem}>
                        <img src="../images/icons/switch.png" alt=" icon" className={stylesMenu.menuIcons}/> <p className={stylesMenu.MenuTitle}>Switch accounts</p>
                    </MenuItem>
                </Link>
                <Divider sx={{ borderBottomWidth: 1.5}} />
                <Link to="/login" style={{ textDecoration: 'none' }} onClick={handleLogout}>
                    <MenuItem className={stylesMenu.MenuItem}>
                        <p className={stylesMenu.MenuTitle}>Log out</p>
                    </MenuItem>
                </Link>
                
            </Menu>
        </>
    )
}