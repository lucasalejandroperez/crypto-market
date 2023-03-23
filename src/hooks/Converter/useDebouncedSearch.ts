import { useRef, useState } from "react";
import coinGeckoApi from "../../api/coinGeckoApi";
import { ISearchCoinInterfaces } from "../../models/searchCoinInterfaces";

export const useDebouncedSearch = () => {
  const [searchItems, setSearchItems] = useState<ISearchCoinInterfaces>();
  const debouncedRef = useRef<NodeJS.Timeout>();

  const handleSearch = async (description: string) => {
    if (debouncedRef.current) {
      clearTimeout(debouncedRef.current);
    }

    debouncedRef.current = setTimeout(async () => {
      try {
        const items = await coinGeckoApi.CoinGecko.searchCoins(description);
        setSearchItems(items);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  return { searchItems, handleSearch };
};