import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import coinGeckoApi from "../../api/coinGeckoApi";
import { Coin, ISearchCoinInterfaces } from "../../models/searchCoinInterfaces";
import { isEmpty } from "../../utilities/jsValidations";
import { NumberFormatCustom } from "../NumberFormatCustom/NumberFormatCustom";
import { ConvertedCoinText } from "./ConvertedCoinText";
import { SearchCoin } from "./SearchCoin";

import "./ConverterBox.css";

export const ConverterBox = () => {
  const [amountToConvert, setAmountToConvert] = useState<string>("1");
  const [leftCoinSearchItems, setLeftCoinSearchItems] =
    useState<ISearchCoinInterfaces>();
  const [rightCoinSearchItems, setRightCoinSearchItems] =
    useState<ISearchCoinInterfaces>();
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
  const debouncedRef = useRef<NodeJS.Timeout>();
  const debouncedRightRef = useRef<NodeJS.Timeout>();

  const blurLeftCoinRef = useRef<NodeJS.Timeout>();
  const blurRightCoinRef = useRef<NodeJS.Timeout>();

  const handleOnChangeAmountToConvert = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAmountToConvert(event.target.value);
  };

  const handleOnChangeLeftCoin = (event: ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    setLeftCoinDescription(description);

    if (description.length < 2) {
      setShowLeftSearch(false);
      return;
    }

    setShowLeftSearch(true);

    if (debouncedRef.current) {
      clearTimeout(debouncedRef.current);
    }

    debouncedRef.current = setTimeout(async () => {
      try {
        const items = await coinGeckoApi.CoinGecko.searchCoins(description);
        setLeftCoinSearchItems(items);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
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

    if (debouncedRightRef.current) {
      clearTimeout(debouncedRightRef.current);
    }

    debouncedRightRef.current = setTimeout(async () => {
      try {
        const items = await coinGeckoApi.CoinGecko.searchCoins(description);
        setRightCoinSearchItems(items);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
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

  return (
    <>
      <Grid container mb={2}>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="value-to-convert"
            color="primary"
            placeholder="Add amount to convert"
            label="Amount to convert"
            onChange={handleOnChangeAmountToConvert}
            value={amountToConvert}
            name="value-to-convert"
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
          />
          <Typography component="span" ml={1}>
            {selectedLeftCoin ? selectedLeftCoin.symbol.toUpperCase() : ""}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={5}>
          <SearchCoin
            label="Search a crypto coin..."
            value={leftCoinDescription}
            showResults={showLeftSearch}
            searchItems={leftCoinSearchItems?.coins}
            onBlur={handleOnBlurLeftCoin}
            onChange={handleOnChangeLeftCoin}
            onClick={handleOnClickLeftCoin}
          />
        </Grid>
        <Box
          item
          xs={12}
          md={2}
          component={Grid}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: "80%",
            }}
            onClick={handleOnClickInvertCoins}
          >
            <CompareArrowsIcon fontSize="large" />
          </Button>
        </Box>
        <Grid item xs={12} md={5}>
          <SearchCoin
            label="Search a crypto coin..."
            value={rightCoinDescription}
            showResults={showRightSearch}
            searchItems={rightCoinSearchItems?.coins}
            onBlur={handleOnBlurRightCoin}
            onChange={handleOnChangeRightCoin}
            onClick={handleOnClickRightCoin}
          />
        </Grid>
      </Grid>
      {selectedLeftCoin &&
        selectedRightCoin &&
        selectedLeftCurrentPrice &&
        selectedRightCurrentPrice && (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            mt={1}
          >
            <ConvertedCoinText
              amount={amountToConvert}
              nameLeftCoin={selectedLeftCoin.name}
              symbolLeftCoin={selectedLeftCoin.symbol}
              priceLeftCoin={selectedLeftCurrentPrice}
              nameRightCoin={selectedRightCoin.name}
              symbolRightCoin={selectedRightCoin.symbol}
              priceRightCoin={selectedRightCurrentPrice}
            />
          </Grid>
        )}
    </>
  );
};
