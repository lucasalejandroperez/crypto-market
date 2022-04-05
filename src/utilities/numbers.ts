export const setPositiveNegativeClass = ( amount:number ):string => {

    const symbolNumber = Math.sign( amount );

    if ( symbolNumber === 1 ) {
        return '#00c853';
    }
    else if ( symbolNumber === -1 ) {
        return '#ff5252';
    }
    else {
        return '#000000';
    }

};