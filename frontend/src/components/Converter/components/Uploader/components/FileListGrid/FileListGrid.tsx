import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    Theme,
    ListItem,
    ListItemAvatar,
    List,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes, { InferProps } from 'prop-types';
import { formatsize } from "../../../../../../helpers";
import { dataRow } from "../../Uploader";
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme: Theme) => ({
    itemAvatar: {
        minWidth: "40px"
    },
    lineThrough: {
        textDecoration: "line-through",
        color: "#9e9e9e"
    },
    danger: {
        color: red[400]
    }
}));

const FileListProps = {
    files: PropTypes.array.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
    disableInput: PropTypes.bool.isRequired
}

type FileListProps = InferProps<typeof FileListProps>;

const FileListGrid: React.FC<FileListProps> = (props) => {

    const { files, onDeleteFile, disableInput } = props;
    const classes = useStyles();
    const handleDelete = (index: number) => {
        onDeleteFile(index);
    }

    return (
        <List>
            {files.map((data: dataRow, index: number) => (
                <Fragment key={index}>
                    <ListItem>
                        <ListItemAvatar className={classes.itemAvatar}>
                            <FolderIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={data.file.name}
                            secondary={data.isValid && !data.status ? formatsize(data.file.size, {
                                one: false
                            }) : (data.status ? data.status : "Invalid File")}
                            classes={data.isValid && !data.status ? {} : (data.status ? { secondary: classes.danger } : { primary: classes.lineThrough })}
                        />
                        <ListItemSecondaryAction >
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDelete(index)}
                                disabled={disableInput}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </Fragment>
            ))}
        </List>
    );
};

FileListGrid.propTypes = FileListProps;

export default FileListGrid;