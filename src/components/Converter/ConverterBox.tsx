import { useEffect, useState } from 'react';

// TODO: Move to helper
export const converterCoinHelper = ( amount:number, left_current_price:number, right_current_price:number ) => {

    return ( amount * left_current_price ) / right_current_price;
}


// export const ConverterBox = () => {

//     const [leftOption, setLeftOption] = useState({ value : 0 });
//     const [rightOption, setRightOption] = useState({ value : 0 });

//     const [leftCoin, setLeftCoin] = useState( data[0] );
//     const [rightCoin, setRightCoin] = useState( data[1] );

//     useEffect(() => {
        
//         const value = { 
//             target: { 
//                 value: 1
//             }
//         };
        
//         handleLeftInputChange( value );

//     }, []);

//     const updateRightOption = ( value ) => {

//         const valueConverted = converterCoinHelper( value, leftCoin.current_price, rightCoin.current_price );
        
//         setRightOption( { value: valueConverted } );

//     };

//     const handleLeftInputChange = ( e ) => {

//         setLeftOption( { value: e.target.value } );
        
//         updateRightOption( e.target.value );

//     };

//     const handleRightInputChange = ( e ) => {
        
//         setRightOption( { value: e.target.value } )

//         const valueConverted = converterCoinHelper( e.target.value, rightCoin.current_price, leftCoin.current_price );
        
//         setLeftOption( { value: valueConverted } );
//     };

//     const handleLeftSelectChange = ( e ) => {
        
//         const selectedLeftCoin = data.find( coin => coin.id === e.target.value );

//         setLeftCoin( selectedLeftCoin );

//         const valueConverted = converterCoinHelper( leftOption.value, selectedLeftCoin.current_price, rightCoin.current_price );
        
//         setRightOption( { value: valueConverted } );
//     };

//     const handleRightSelectChange = ( e ) => {

//         const selectedRightCoin = data.find( coin => coin.id === e.target.value );

//         setRightCoin( selectedRightCoin );

//         const valueConverted = converterCoinHelper( leftOption.value, leftCoin.current_price, selectedRightCoin.current_price );
        
//         setRightOption( { value: valueConverted } );
//     };

//     return (
//         <div className="col-12 converter__box">
//             <div className="row align-items-center">
//                 <div className="col-3">
//                     <input 
//                         autoComplete="false"
//                         className="form-control"
//                         id="leftOption"
//                         name="leftOption"
//                         type="number" 
//                         onChange={ handleLeftInputChange }
//                         value={ leftOption.value }
//                     />
//                 </div>
//                 <div className="col-2">
//                     <select id="leftCoin" className="form-control" defaultValue={ leftCoin.id } onChange={ handleLeftSelectChange }>
//                         {
//                             data.map( coin => (
//                                 <option 
//                                     key={ coin.id }
//                                     value={ coin.id }
//                                 >
//                                     { coin.symbol }
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>
//                 <div className="col-1 ml-1 mr-1 text-center">
//                     <strong>=</strong>
//                 </div>
//                 <div className="col-3">
//                     <input 
//                         autoComplete="false"
//                         className="form-control"
//                         id="rightOption"
//                         name="rightOption"
//                         type="number" 
//                         onChange={ handleRightInputChange }
//                         value={ rightOption.value }
//                     />
//                 </div>
//                 <div className="col-2">
//                     <select id="rightCoin" className="form-control" value={ rightCoin.id } onChange={ handleRightSelectChange }>
//                         {
//                             data.map( coin => (
//                                 <option 
//                                     key={ coin.id }
//                                     value={ coin.id }
//                                 >
//                                     { coin.symbol }
//                                 </option>
//                             ))
//                         }
//                     </select>
//                 </div>
//             </div>
//             <div className="text-center mt-5 converter__result pt-5 pb-5">
//                 <h1>
//                     <span className="mr-2">
//                         <img src={ leftCoin.image } className="mr-2" alt="symbol" width="35" height="35" />
//                         { leftOption.value }
//                         <strong className="text-uppercase ml-2">{ leftCoin.symbol }</strong>
//                     </span>

//                     <strong>=</strong> 

//                     <span className="ml-2 mr-1">
//                         { rightOption.value }
//                         {/* <NumberFormat value={ rightOption.value } displayType={ 'text' } thousandSeparator={ true } decimalScale={ 2 } />         */}
//                         <strong className="text-uppercase ml-2">{ rightCoin.symbol }</strong>
//                         <img src={ rightCoin.image } className="ml-2" alt="symbol" width="35" height="35" />
//                     </span>
//                     </h1>
//             </div>
//         </div>
//     )
// }


