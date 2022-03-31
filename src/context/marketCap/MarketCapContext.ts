import { createContext } from "react";
import { ICoin } from "../../models/coinInterfaces";

export interface MarketCapContextProps {
    searchDescription: string;
    orderBy: string;
    coinId: string;
    coinDetail: ICoin;

    // Methods
    setSearchDescription: ( description:string ) => void;
    setOrderBy: ( orderBy:string ) => void;
    setCoinId: ( id: string ) => void;
    setCoin: ( coin:ICoin ) => void;
}

export const MarketCapContext = createContext<MarketCapContextProps>({} as MarketCapContextProps);