import React from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from "@material-ui/icons";
import { Link } from 'react-router-dom';

import logo from '../../assests/logo.png';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.AppBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Schwarz Kitchen" height="25px" className={classes.image} />
                        Schwarz Kitchen
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.buton} />

                        <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit" >
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>      
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;