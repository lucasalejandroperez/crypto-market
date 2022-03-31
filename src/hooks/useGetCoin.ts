import { useQuery } from "react-query";
import CoinGeckoApi from "../api/coinGeckoApi";
import { ICoin } from "../models/coinInterfaces";

const key = 'getCoin';

export const useGetCoin = ( id:string ) => {
    return useQuery<ICoin, Error>([key], () => CoinGeckoApi.CoinGecko.getCoin( id ));
}