import { ChangeEvent, useEffect, useRef, useState } from "react";
import coinGeckoApi from "../../api/coinGeckoApi";
import { Coin } from "../../models/searchCoinInterfaces";
import { isEmpty } from "../../utilities/jsValidations";
import { useDebouncedSearch } from "./useDebouncedSearch";

export const useConverter = () => {
    const [showLeftSearch, setShowLeftSearch] = useState(false);
    const [showRightSearch, setShowRightSearch] = useState(false);
    const [selectedLeftCoin, setSelectedLeftCoin] = useState<Coin | null>(null);
    const [selectedLeftCurrentPrice, setSelectedLeftCurrentPrice] =
        useState<number>();
    const [selectedRightCurrentPrice, setSelectedRightCurrentPrice] =
        useState<number>();
    const [selectedRightCoin, setSelectedRightCoin] = useState<Coin | null>(null);
    const [leftCoinDescription, setLeftCoinDescription] = useState("");
    const [rightCoinDescription, setRightCoinDescription] = useState("");

        const blurLeftCoinRef = useRef<NodeJS.Timeout>();
    const blurRightCoinRef = useRef<NodeJS.Timeout>();

        const { searchItems: searchItemsLeft, handleSearch: handleSearchLeftCoin } =
        useDebouncedSearch();

    const { searchItems: searchItemsRight, handleSearch: handleSearchRightCoin } =
        useDebouncedSearch();

    const handleOnChangeLeftCoin = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        setLeftCoinDescription(description);

        if (description.length < 2) {
        setShowLeftSearch(false);
        return;
        }

        setShowLeftSearch(true);
        handleSearchLeftCoin(description);
    };

    const handleOnClickLeftCoin = async (coin: Coin) => {
        setSelectedLeftCoin(coin);
        setLeftCoinDescription(`${coin.name} (${coin.symbol.toUpperCase()})`);

        const coinMarketData = await coinGeckoApi.CoinGecko.getCoin(
        coin.name.toLowerCase()
        );

        if (
        coinMarketData &&
        coinMarketData.market_data &&
        coinMarketData.market_data.current_price
        ) {
        setSelectedLeftCurrentPrice(coinMarketData.market_data.current_price.usd);
        }
    };

    const handleOnBlurLeftCoin = () => {
        if (blurLeftCoinRef.current) {
        clearTimeout(blurLeftCoinRef.current);
        }
        blurLeftCoinRef.current = setTimeout(() => {
        setShowLeftSearch(false);
        }, 500);
    };

    const handleOnChangeRightCoin = (event: ChangeEvent<HTMLInputElement>) => {
        const description = event.target.value;
        setRightCoinDescription(description);

        if (description.length < 2) {
        setShowRightSearch(false);
        return;
        }

        setShowRightSearch(true);
        handleSearchRightCoin(description);
    };

    const handleOnBlurRightCoin = () => {
        if (blurRightCoinRef.current) {
        clearTimeout(blurRightCoinRef.current);
        }
        blurRightCoinRef.current = setTimeout(() => {
        setShowRightSearch(false);
        }, 500);
    };

    const handleOnClickRightCoin = async (coin: Coin) => {
        setSelectedRightCoin(coin);
        setRightCoinDescription(`${coin.name} (${coin.symbol.toUpperCase()})`);

        const coinMarketData = await coinGeckoApi.CoinGecko.getCoin(
        coin.name.toLowerCase()
        );

        if (
        coinMarketData &&
        coinMarketData.market_data &&
        coinMarketData.market_data.current_price
        ) {
        setSelectedRightCurrentPrice(
            coinMarketData.market_data.current_price.usd
        );
        }
    };

    const handleOnClickInvertCoins = () => {
        const leftCoin = Object.create(selectedLeftCoin);
        const rightCoin = Object.create(selectedRightCoin);

        if (leftCoin && !isEmpty(leftCoin)) {
        handleOnClickRightCoin(leftCoin);
        }

        if (rightCoin && !isEmpty(rightCoin)) {
        handleOnClickLeftCoin(rightCoin);
        }
    };

    useEffect(() => {
        return () => {
        if (blurLeftCoinRef.current) {
            clearTimeout(blurLeftCoinRef.current);
        }

        if (blurRightCoinRef.current) {
            clearTimeout(blurRightCoinRef.current);
        }
        };
    }, []);

    return {
        selectedLeftCoin,
        selectedRightCoin,
        showLeftSearch,
        showRightSearch,
        selectedLeftCurrentPrice,
        selectedRightCurrentPrice,
        leftCoinDescription,
        rightCoinDescription,
        searchItemsLeft,
        searchItemsRight,
        handleOnChangeLeftCoin,
        handleOnClickLeftCoin,
        handleOnBlurLeftCoin,
        handleOnChangeRightCoin,
        handleOnBlurRightCoin,
        handleOnClickRightCoin,
        handleOnClickInvertCoins
    }
}