import { useReducer } from "react";
import { MarketCapContext } from "./MarketCapContext";
import { marketCapReducer } from "./marketCapReducer";

interface Props {
    children: JSX.Element | JSX.Element[]
}

export interface MarketCapState {
    searchDescription: string;
    orderBy: string;
    coinId: string;
}

const INITIAL_STATE: MarketCapState = {
    searchDescription: '',
    orderBy: 'market_cap_desc',
    coinId: 'bitcoin'
}

export const MarketCapProvider = ( { children }:Props ) => {

    const [state, dispatch] = useReducer(marketCapReducer, INITIAL_STATE);

    const setSearchDescription = ( description:string ) => {
        
        dispatch({ type: 'setSearchDescription', payload: description });
    }

    const setOrderBy = ( orderBy:string ) => {
        
        dispatch({ type: 'setOrderBy', payload: orderBy });
    }

    const setCoinId = ( id:string ) => {

        dispatch({ type: 'setCoinId', payload: id });

    }

    return (
        <MarketCapContext.Provider value={{
            ...state,
    
            // Methods
            setSearchDescription,
            setOrderBy,
            setCoinId,
        }}>
            { children }
        </MarketCapContext.Provider>
    )
}
