import { useQuery } from "react-query";
import CoinGeckoApi from "../api/coinGeckoApi";
import { ISearchCoinInterfaces } from "../models/searchCoinInterfaces";

const key = 'searchCoin';

export const useSearchCoin = ( description:string ) => {
    return useQuery<ISearchCoinInterfaces, Error>([key], () => CoinGeckoApi.CoinGecko.searchCoins( description ));
  }