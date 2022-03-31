import { createContext } from "react";

export interface MarketCapContextProps {
    searchDescription: string;
    orderBy: string;
    coinId: string;

    // Methods
    setSearchDescription: ( description:string ) => void;
    setOrderBy: ( orderBy:string ) => void;
    setCoinId: ( id: string ) => void;
}

export const MarketCapContext = createContext<MarketCapContextProps>({} as MarketCapContextProps);