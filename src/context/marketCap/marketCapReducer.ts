import { MarketCapState } from "./MarketCapProvider"

type MarketCapAction = 
| { type: 'setSearchDescription', payload: string }
| { type: 'setOrderBy', payload: string }

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
        default:
            return state;
    }
}
