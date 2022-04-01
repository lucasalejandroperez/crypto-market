import { MarketCapState } from "./MarketCapProvider"

type MarketCapAction = 
| { type: 'setSearchDescription', payload: string }
| { type: 'setOrderBy', payload: string }
| { type: 'setShowSearch', payload: boolean }

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
        case 'setShowSearch':
            return {
                ...state,
                showSearch: action.payload
            }
        default:
            return state;
    }
}
