import React, { useState, SyntheticEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Typography } from '@material-ui/core';
import PropTypes, { InferProps } from "prop-types";
import xmlFormatter from "xml-formatter";
import MessageBar from '../../../../../MessageBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            flex: 1,
            color: "#ffffff"
        },
        xml: {
            margin: theme.spacing(2),
            whiteSpace: "pre-wrap"
        }
    }),
);

const OpmlViewerProps = {
    fileName: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

type OpmlViewerProps = InferProps<typeof OpmlViewerProps>;

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OpmlViewer: React.FC<OpmlViewerProps> = (props: OpmlViewerProps) => {

    const { data, open, onClose, fileName } = props;
    const [toastrOpen, setToastrOpen] = useState(false);
    const classes = useStyles();

    const handleToastrClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastrOpen(false);
    }

    const handleOnClose = () => {
        onClose();
    }   

    return (
        <>
            <MessageBar
                open={toastrOpen}
                message="Copied!"
                variant="success"
                onClose={handleToastrClose}
            />
            <Dialog fullScreen open={open} onClose={handleOnClose} TransitionComponent={Transition} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h4" className={classes.title}>
                            {fileName}
                        </Typography>
                        <Tooltip title="Close" aria-label="Close">
                            <IconButton
                                color="inherit"
                                onClick={handleOnClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <pre className={classes.xml}>
                    {xmlFormatter(data)}
                </pre>
            </Dialog>
        </>
    );
}

OpmlViewer.propTypes = OpmlViewerProps;

export default OpmlViewer;