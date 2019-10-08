import React from 'react';
import { Snackbar, SnackbarContent, Icon, IconButton, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import PropTypes, { InferProps } from "prop-types";

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
}));

const MessageBarProps = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

type MessageBarProps = InferProps<typeof MessageBarProps>;

const MessageBar: React.FC<MessageBarProps> = (props) => {
    const { open, message, variant, onClose } = props;
    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <SnackbarContent
                className={classes[variant]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar">
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};

MessageBar.propTypes = MessageBarProps;

export default MessageBar;