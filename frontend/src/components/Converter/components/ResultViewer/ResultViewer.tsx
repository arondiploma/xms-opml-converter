import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes, { InferProps } from "prop-types";
import { ResultRow } from "./components";
import { Grid, Container, Button } from '@material-ui/core';

const ResultViewProps = {
    results: PropTypes.arrayOf(PropTypes.any).isRequired,
    onNew: PropTypes.func.isRequired
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    xml: {
        whiteSpace: "pre-wrap"
    },
    toolbar: {
        marginBottom: theme.spacing(4)
    }
}));

type ResultViewProps = InferProps<typeof ResultViewProps>

const ResultViewer: React.FC<ResultViewProps> = (props) => {
    const classes = useStyles();
    const { results, onNew } = props;

    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.toolbar}
            >
                <Grid item>
                    <Typography variant="h2">Result</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onNew}
                    >
                        New
                    </Button>
                </Grid>
            </Grid>

            {results.map((row, index) => (<ResultRow key={index} row={row} />))}

        </Container>
    );
}

ResultViewer.propTypes = ResultViewProps;

export default ResultViewer;
