export const converterCoinHelper = ( amount:number, left_current_price:number, right_current_price:number ) => {
    return ( amount * left_current_price ) / right_current_price;
}