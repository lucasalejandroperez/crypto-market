import { createContext } from "react";

export interface MarketCapContextProps {
    searchDescription: string;
    orderBy: string;

    // Methods
    setSearchDescription: ( description:string ) => void;
    setOrderBy: ( orderBy:string ) => void;
}

export const MarketCapContext = createContext<MarketCapContextProps>({} as MarketCapContextProps);