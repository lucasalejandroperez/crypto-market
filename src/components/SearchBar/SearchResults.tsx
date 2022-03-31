import { useContext, useEffect } from "react";
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";
import { useSearchCoin } from "../../hooks/useSearchCoin";
import { Coin } from "../../models/searchCoinInterfaces";
import { Loader } from "../Loader/Loader";

import './SearchBar.css';

export const SearchResults = () => {

    const { searchDescription } = useContext( MarketCapContext );

    const {
        data, 
        error, 
        isLoading, 
        isError, 
        isSuccess, 
        status, 
        isIdle, 
        isFetching,
        refetch 
    } = useSearchCoin(searchDescription);

    useEffect(() => {
        refetch();
    }, [searchDescription])

    const handleCoinClick = ( coin:Coin ) => {
        console.log(coin);
    }

    if ( isLoading ) {
        return (
            <Loader />
        )
    }

    if ( isFetching ) {
        return (
          <Loader />
        )
    }
    
    if ( error ) {
        return (
          <section>
            Error fetching coins: { error.message }
          </section>
        )
    }

    return (
        <div>
            <ul className="list-group mt-3">
                {
                    data && data.coins &&
                    data.coins.map( coin => (
                        // TODO: Must be a component
                        <li
                            key={ coin.id }
                            className={`list-group-item list-group-item-action pointer`  }
                            onClick={ () => handleCoinClick( coin ) }
                        >
                            <h6>{ coin.name }</h6>
                            <p 
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                { coin.symbol }
                            </p>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}
