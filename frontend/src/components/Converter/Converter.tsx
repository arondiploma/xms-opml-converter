import React, { useState } from 'react';
import { Uploader, ResultViewer } from "./components";

const Converter: React.FC = () => {

    const [results, setResult] = useState<Array<any>>([]);
    const handleResult = (convertResult: Array<any>) => {
        setResult(convertResult);
    }
    const handleNew = () => {
        setResult([]);
    }

    return (
        <>
            {
                results.length === 0 ?
                    (<Uploader onConvertSuccess={handleResult} />) :
                    (<ResultViewer results={results} onNew={handleNew} />)
            }
        </>
    );
};

export default Converter;