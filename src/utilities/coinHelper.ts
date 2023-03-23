export const converterCoinHelper = ( amount:number, left_current_price:number, right_current_price:number ) => {
    return ( amount * left_current_price ) / right_current_price;
}

export const setCirculatingSupplyPercentage = ( currentSupply: number, totalSupply: number ) => {
    let circulatingText = '';

    if ( totalSupply !== null) {
        circulatingText = ((100 * currentSupply) / totalSupply).toString();
    }

    return circulatingText;
};

export const setPercentageClass = (number: number) => {
    const symbolNumber = Math.sign(number);

    if (symbolNumber === 1) {
      return "general_greenPercentage";
    } else if (symbolNumber === -1) {
      return "general_redPercentage";
    } else {
      return "general_blackPercentage";
    }
  };