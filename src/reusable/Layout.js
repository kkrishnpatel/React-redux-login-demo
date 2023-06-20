import React, { Fragment } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const pages = [
    { "link": "home", "title": "Home" },
    { "link": "profile", "title": "Profile" },
    { "link": "logout", "title": "Logout" }
];


export const Layout = (props) => {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const mobileMenu = () => {
        return (
            <>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    CromWell
                </Typography>

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
                        {pages.map((page) => (
                            <MenuItem
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                component={Link}
                                to={`/${page.link}`}
                                selected={location.pathname === `/${page.link}`}
                                classes={{ selected: 's-selected' }}
                            >
                                <Typography textAlign="center">{page.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </>
        )
    }

    const deskMenu = () => {
        return (
            <>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    CromWell
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block', marginLeft: page.title === "Logout" ? "auto" : '' }}
                            key={page.title}
                            component={Link}
                            to={`/${page.link}`}
                            color="warning"
                            variant={location.pathname === `/${page.link}` ? "contained" : ""}
                        >
                            {page.title}
                        </Button>
                    ))}
                    
                </Box>
            </>
        )
    }

    const header = () => {
        return (
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {mobileMenu()}
                            {deskMenu()}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        )
    }
    const footer = () => {
        return (
            <Toolbar sx={{ position: "static", backgroundColor: "#525252", height: "6vh", color: "white" }}>
                <h1>Krishn</h1>
            </Toolbar>
        )
    }
    return (
        <Fragment>
            {header()}
            <div style={{ height: "80vh" }}>
                {props.children}
            </div>
            {footer()}
        </Fragment>
    )

}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };