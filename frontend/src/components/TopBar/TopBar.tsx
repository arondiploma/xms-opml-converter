import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Toolbar, IconButton, Typography, Button, AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#ffffff"
    },
}),
);

const TopBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" className={classes.title}>
                        XLS to OPML Converter
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default TopBar;