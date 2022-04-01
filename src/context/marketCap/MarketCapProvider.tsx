import { useReducer } from "react";
import { ICoin } from "../../models/coinInterfaces";
import { MarketCapContext } from "./MarketCapContext";
import { marketCapReducer } from "./marketCapReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MarketCapState {
    searchDescription: string;
    orderBy: string;
    showSearch: boolean;
}

const INITIAL_STATE: MarketCapState = {
    searchDescription: '',
    orderBy: 'market_cap_desc',
    showSearch: false
}

export const MarketCapProvider = ( { children }:Props ) => {

    const [state, dispatch] = useReducer(marketCapReducer, INITIAL_STATE);

    const setSearchDescription = ( description:string ) => {
        dispatch({ type: 'setSearchDescription', payload: description });
    }

    const setOrderBy = ( orderBy:string ) => {
        dispatch({ type: 'setOrderBy', payload: orderBy });
    }

    const setShowSearch = ( showSearch: boolean ) => {
        dispatch({ type: 'setShowSearch', payload: showSearch });
    }

    return (
        <MarketCapContext.Provider value={{
            ...state,
    
            // Methods
            setSearchDescription,
            setOrderBy,
            setShowSearch
        }}>
            { children }
        </MarketCapContext.Provider>
    )
}
