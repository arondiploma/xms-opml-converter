import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Theme,
    Typography
} from '@material-ui/core';
import PropTypes, { InferProps } from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    hidden: {
        display: 'none',
    },
    buttonNoFile: {
        padding: "48px",
    },
    button: {
        border: "1px dashed #eeeeee",
        display: "flex",
        outline: "none",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        '&:hover': {
            cursor: "pointer",
            opacity: 0.5,
            backgroundColor: "#fafafa"
        }
    },
    file_img: {
        width: "130px"
    }
}));

const FileSelectorProps = {
    onSelect: PropTypes.func.isRequired,
    filesCount: PropTypes.number.isRequired,
    disableInput: PropTypes.bool.isRequired
}

type FileSelectorProps = InferProps<typeof FileSelectorProps>;

const FileSelector: React.FC<FileSelectorProps> = (props) => {

    const { onSelect, filesCount, disableInput } = props;
    const classes = useStyles();

    const handleChange = (event: { target: HTMLInputElement }) => {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                onSelect(files[i]);
            }
        }
        event.target.value = "";
    }


    return (
        <label htmlFor="input-file">
            <div className={clsx(classes.button, {
                [classes.buttonNoFile]: filesCount === 0
            })} >
                <input
                    id="input-file"
                    multiple type="file"
                    className={classes.hidden}
                    onChange={handleChange}
                    disabled={disableInput}
                />
                <div>
                    <img
                        alt="Select files"
                        src="/images/undraw_add_file2_gvbb.svg"
                        className={classes.file_img}
                    />
                </div>
                <div>
                    <Typography variant="h3">Select files</Typography>
                    <Typography paragraph>Click here to open file browser.</Typography>
                </div>
            </div>
        </label >
    );
}

FileSelector.propTypes = FileSelectorProps;

export default FileSelector;