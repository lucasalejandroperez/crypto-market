import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";
import { useSearchCoin } from "../../hooks/useSearchCoin";
import { Coin } from "../../models/searchCoinInterfaces";
import { Loader } from "../Loader/Loader";

import './SearchBar.css';

export const SearchResults = () => {

    const { searchDescription } = useContext( MarketCapContext );

    const navigate = useNavigate();

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

    const handleCoinClick = async( coin:Coin ) => {
        navigate(`/coin/${ coin.id }`)
    }

    if ( error ) {
        return (
          <section>
            Error fetching coins: { error.message }
          </section>
        )
    }

    return (
        <div className="search-results">
            <ul className="list-group search-items mt-3">

                {
                    isLoading && <Loader />
                }

                {
                    data && data.coins &&
                    data.coins.map( coin => (
                        // TODO: Must be a component
                        <li
                            key={ coin.id }
                            className={`list-group-item list-group-item-action pointer`  }
                            onClick={ () => handleCoinClick( coin ) }
                        >
                            <span
                                onClick={ () => handleCoinClick( coin ) }
                            >{ coin.name }</span>
                            {
                                coin.market_cap_rank && 
                                    <span className="ml-1"><small>({ coin.market_cap_rank })</small></span>
                            }
                            <p 
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                <span className="mr-1">
                                    <img src={ coin.thumb } alt="coin logo" />
                                </span>
                                <span>
                                    { coin.symbol }
                                </span>
                            </p>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}
