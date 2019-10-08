import React, { useState } from 'react';
import { CardContent, Container, Card, makeStyles, Theme } from '@material-ui/core';
import { FileSelector, FileListGrid, Toolbar } from './components';
import axios from "axios";
import path from "path";
import PropTypes, { InferProps } from "prop-types";


const useStyles = makeStyles((theme: Theme) => ({
    card: {
        marginTop: theme.spacing(5)
    }
}));

export type dataRow = {
    file: File,
    isValid: boolean,
    status?: string
}

interface DataSet {
    files: dataRow[]
}

const UploaderProps = {
    onConvertSuccess: PropTypes.func.isRequired
}

type UploaderProps = InferProps<typeof UploaderProps>

const Uploader: React.FC<UploaderProps> = (props) => {

    const classes = useStyles();
    const { onConvertSuccess } = props;
    const dataSet: DataSet = { files: [] };
    const [converting, setConverting] = useState(false);
    const [data, setData] = useState(dataSet);

    const handleAddFile = (file: File): void => {
        data.files.push({
            isValid: path.extname(file.name).toLowerCase() === ".xls",
            file: file
        });
        setData({ ...data });
    }

    const handleDelete = (index: number): void => {
        data.files.splice(index, 1);
        setData({ ...data });
    }

    const handleClearAll = (): void => {
        data.files = [];
        setData({ ...data });
    }

    const hasValidFiles = (): boolean => {
        let valid: boolean = true;
        data.files.forEach((file) => {
            valid = valid && !file.isValid;
        });
        return valid;
    }

    const handleConvert = () => {
        let upload: Promise<any>[] = [];
        setConverting(true);

        data.files.forEach((fileData, index: number) => {
            if (fileData.isValid) {
                data.files[index].status = "";
                setData({ ...data });

                upload.push(uploadFile(fileData.file))
            }
        });

        axios
            .all(upload)
            .then(axios.spread(function (...results) {
                let allSuccess: boolean = true;
                setConverting(false);

                results = results.map((result, index: number) => {
                    allSuccess = allSuccess && !result.isAxiosError;
                    if (result.isAxiosError) {
                        data.files[index].status = "Conversion Failed. " + (result.response.data.message || "");
                        setData({ ...data });
                    }
                    return result.data;
                });

                if (allSuccess) {
                    onConvertSuccess(results);
                }
            }))

    }

    const uploadFile = (file: File) => {
        let form: FormData = new FormData();
        form.append("file", file);
        return new Promise((res) => (axios.post(`/api/convert`, form).then(res).catch(res)));
    }


    return (
        <Container maxWidth="md">
            <Card className={classes.card}>
                <CardContent>
                    <FileSelector
                        onSelect={handleAddFile}
                        filesCount={data.files.length}
                        disableInput={converting}
                    />
                    <FileListGrid
                        files={data.files}
                        onDeleteFile={handleDelete}
                        disableInput={converting}
                    />
                </CardContent>
                <Toolbar
                    hasFiles={data.files.length === 0}
                    onClearAll={handleClearAll}
                    hasValidFiles={hasValidFiles()}
                    onConvert={handleConvert}
                    disableInput={converting}
                />
            </Card>
        </Container>
    );
};


Uploader.propTypes = UploaderProps;

export default Uploader;