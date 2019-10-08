import React from 'react';
import { CardActions, Button, makeStyles, Theme, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes, { InferProps } from 'prop-types';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
    controls: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2)
    },
    hidden: {
        display: "none"
    },
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ToolbarProps = {
    hasFiles: PropTypes.bool.isRequired,
    onClearAll: PropTypes.func.isRequired,
    hasValidFiles: PropTypes.bool.isRequired,
    onConvert: PropTypes.func.isRequired,
    disableInput: PropTypes.bool.isRequired
};

type ToolbarProps = InferProps<typeof ToolbarProps>;

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { onClearAll, hasFiles, hasValidFiles, onConvert, disableInput } = props;
    const classes = useStyles();

    const handleConvert = () => {
        onConvert();
    }

    return (
        <CardActions className={clsx(classes.controls, {
            [classes.hidden]: hasFiles
        })} >
            <Button
                size="small"
                color="primary"
                onClick={onClearAll}
                disabled={disableInput}
            >
                Clear All
            </Button>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={hasValidFiles || disableInput}
                    onClick={handleConvert}
                >
                    Convert
                </Button>
                {disableInput && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

        </CardActions>
    );
};

export default Toolbar;