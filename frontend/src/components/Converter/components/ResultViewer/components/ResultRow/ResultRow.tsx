import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { Card, CardContent, makeStyles, Theme, Typography, Button } from '@material-ui/core';
import OpmlViewer from "../OpmlViewer";
import PropTypes, { InferProps } from "prop-types";
import clipboardJS from "clipboard";
import MessageBar from "../../../../../MessageBar";

const ResultViewProps = {
    row: PropTypes.any.isRequired
};

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        marginBottom: theme.spacing(2),
    },
    content: {
        display: "flex"
    },
    filename: {
        flexGrow: 1,
        marginTop: theme.spacing(1)
    },
    spacing: {
        marginRight: theme.spacing(1)
    }
}));


type ResultViewProps = InferProps<typeof ResultViewProps>

const ResultRow: React.FC<ResultViewProps> = (props) => {
    const [toastrOpen, setToastrOpen] = useState(false);
    const [preview, setPreview] = useState(false);

    const btn = useRef<HTMLButtonElement>(null);
    const classes = useStyles();
    const { row } = props;

    useEffect(() => {
        let btnClipboard: clipboardJS;
        if (btn.current)
            btnClipboard = new clipboardJS(btn.current, {
                text: function (trigger) {
                    setToastrOpen(true);
                    return row.opml;
                }
            });
        return () => {
            if (btnClipboard)
                btnClipboard.destroy();
        }
    }, []);//add [] to execute once

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastrOpen(false);
    }

    const tooglePreview = () => {
        setPreview(!preview);
    };

    return (
        <>
            <OpmlViewer
                open={preview}
                data={row.opml}
                onClose={tooglePreview}
                fileName={row.fileName}
            />
            <MessageBar
                open={toastrOpen}
                message="Copied!"
                variant="success"
                onClose={handleClose}
            />
            <Card className={classes.row}>
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        className={classes.filename}
                    >{row.fileName}</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        color="default"
                        className={classes.spacing}
                        onClick={tooglePreview}
                    >
                        View
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        ref={btn}
                    >
                        Copy
                </Button>
                </CardContent>
            </Card>

        </>
    );
};

ResultRow.propTypes = ResultViewProps;

export default ResultRow;