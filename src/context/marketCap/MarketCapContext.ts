import { createContext } from "react";

export interface MarketCapContextProps {
    searchDescription: string;
    orderBy: string;
    showSearch: boolean;

    // Methods
    setSearchDescription: ( description:string ) => void;
    setOrderBy: ( orderBy:string ) => void;
    setShowSearch: ( showSearch: boolean ) => void;
}

export const MarketCapContext = createContext<MarketCapContextProps>({} as MarketCapContextProps);