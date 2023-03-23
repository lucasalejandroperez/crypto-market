import { ChangeEvent, useEffect, useRef, useState } from "react";
import coinGeckoApi from "../../api/coinGeckoApi";
import { Coin } from "../../models/searchCoinInterfaces";
import { useDebouncedSearch } from "./useDebouncedSearch";

export const useCoinSearch = () => {

    const [coinDescription, setCoinDescription] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
    const [selectedCurrentPrice, setSelectedCurrentPrice] = useState<number>();
    const blurCoinRef = useRef<NodeJS.Timeout>();

    const { searchItems, handleSearch } = useDebouncedSearch();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        setCoinDescription(description);

        if (description.length < 2) {
        setShowSearch(false);
        return;
        }

        setShowSearch(true);
        handleSearch(description);
    };

    const handleOnClick = async (coin: Coin) => {
        setSelectedCoin(coin);
        setCoinDescription(`${coin.name} (${coin.symbol.toUpperCase()})`);

        const coinMarketData = await coinGeckoApi.CoinGecko.getCoin(
        coin.name.toLowerCase()
        );

        if (
        coinMarketData &&
        coinMarketData.market_data &&
        coinMarketData.market_data.current_price
        ) {
        setSelectedCurrentPrice(coinMarketData.market_data.current_price.usd);
        }
    };

    const handleOnBlur = () => {
        if (blurCoinRef.current) {
        clearTimeout(blurCoinRef.current);
        }
        blurCoinRef.current = setTimeout(() => {
        setShowSearch(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (blurCoinRef.current) {
                clearTimeout(blurCoinRef.current);
            }
        };
    }, []);

    return {
        coinDescription,
        showSearch,
        selectedCoin,
        selectedCurrentPrice,
        blurCoinRef,
        searchItems,
        handleOnChange,
        handleOnClick,
        handleOnBlur
    }
}