let sizes: string[] = [
    'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'
];

type options = {
    nospace?: boolean,
    one?: boolean,
    places?: number,
    numOnly?: boolean
};

export default function (size: number, opts?: options) {
    const nospace = opts ? opts.nospace : true;
    const one = opts ? opts.one : true;
    const places = opts ? opts.places || 1 : 1;
    const numOnly = opts ? opts.numOnly : false;
    let mysize: any;

    for (let id = 0; id < sizes.length; ++id) {
        let unit: string = sizes[id];

        if (one) {
            unit = unit.slice(0, 1);
        }

        let s: number = Math.pow(1024, id);
        let fixed: string;
        if (size >= s) {
            fixed = String((size / s).toFixed(places));
            if (fixed.indexOf('.0') === fixed.length - 2) {
                fixed = fixed.slice(0, -2);
            }
            mysize = fixed + (nospace ? '' : ' ') + unit;
        }
    }

    // zero handling
    // always prints in Bytes
    if (!mysize) {
        let _unit = (one ? sizes[0].slice(0, 1) : sizes[0]);
        mysize = '0' + (nospace ? '' : ' ') + _unit;
    }

    if (numOnly) {
        mysize = Number.parseFloat(mysize);
    }

    return mysize;
};
