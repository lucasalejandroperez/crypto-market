import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import coinGeckoApi from "../../api/coinGeckoApi";
import { Coin } from "../../models/searchCoinInterfaces";
import { isEmpty } from "../../utilities/jsValidations";
import { NumberFormatCustom } from "../NumberFormatCustom/NumberFormatCustom";
import { ConvertedCoinText } from "./ConvertedCoinText";
import { SearchCoin } from "./SearchCoin";
import { useDebouncedSearch } from "../../hooks/Converter/useDebouncedSearch";
import { useAmountToConvert } from "../../hooks/Converter/useAmountToConvert";

import "./ConverterBox.css";

export const ConverterBox = () => {
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
  const { amountToConvert, handleOnChangeAmountToConvert } =
    useAmountToConvert("1");

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
            searchItems={searchItemsLeft?.coins}
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
            searchItems={searchItemsRight?.coins}
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
