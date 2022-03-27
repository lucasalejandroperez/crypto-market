import { useQuery } from "react-query";
import CoinGeckoApi from "../api/coinGeckoApi";
import { ICoinGeckoInterfaces } from "../models/coinGeckoInterfaces";

const key = "marketcap";

export const useMarketCap = () => {

  return useQuery<ICoinGeckoInterfaces[], Error>([key], CoinGeckoApi.CoinGecko.markets);

}
