import { ICoin } from "../../models/coinInterfaces"
import { MarketCapState } from "./MarketCapProvider"

type MarketCapAction = 
| { type: 'setSearchDescription', payload: string }
| { type: 'setOrderBy', payload: string }
| { type: 'setCoinId', payload: string }
| { type: 'setCoin', payload: ICoin }

export const marketCapReducer = ( state: MarketCapState, action: MarketCapAction ): MarketCapState => {
    switch ( action.type ) {
        case 'setSearchDescription':
            return {
                ...state,
                searchDescription: action.payload
            }
        case 'setOrderBy':
            return {
                ...state,
                orderBy: action.payload
            }
        case 'setCoinId':
            return {
                ...state,
                coinId: action.payload
            }
        case 'setCoin':
            return {
                ...state,
                coinDetail: action.payload
            }
        default:
            return state;
    }
}
