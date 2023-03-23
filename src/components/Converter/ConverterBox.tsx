import { ChangeEvent, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import coinGeckoApi from "../../api/coinGeckoApi";
import { Coin, ISearchCoinInterfaces } from "../../models/searchCoinInterfaces";

import "./ConverterBox.css";
import { isEmpty } from "../../utilities/jsValidations";
import { NumberFormatCustom } from "../NumberFormatCustom/NumberFormatCustom";
import { converterCoinHelper } from "../../utilities/coinHelper";

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

  const handleOnBlurLeftCoin = () => {
    setTimeout(() => {
      setShowLeftSearch(false);
    }, 500);
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
    setTimeout(() => {
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

  return (
    <Container
      maxWidth="md"
      sx={{
        border: "1px solid grey",
        marginTop: 2,
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
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
          <TextField
            autoComplete="off"
            id="left-coin"
            label="Search a crypto coin..."
            color="primary"
            placeholder="Search a crypto coin..."
            onChange={handleOnChangeLeftCoin}
            sx={{
              width: "100%",
            }}
            onBlur={handleOnBlurLeftCoin}
            value={leftCoinDescription}
          />
          {showLeftSearch && (
            <div className="converter-results">
              <ul className="list-group converter-items mt-3">
                {leftCoinSearchItems &&
                  leftCoinSearchItems.coins &&
                  leftCoinSearchItems.coins.map((coin) => (
                    <li
                      key={coin.id}
                      className={`list-group-item list-group-item-action pointer`}
                      onClick={() => handleOnClickLeftCoin(coin)}
                    >
                      <span onClick={() => handleOnClickLeftCoin(coin)}>
                        {coin.name}
                      </span>
                      {coin.market_cap_rank && (
                        <span className="ml-1">
                          <small>({coin.market_cap_rank})</small>
                        </span>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        <span className="mr-1">
                          <img src={coin.thumb} alt="coin logo" />
                        </span>
                        <span>{coin.symbol}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
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
          <TextField
            autoComplete="off"
            id="right-coin"
            label="Search a crypto coin..."
            color="primary"
            placeholder="Search a crypto coin..."
            sx={{
              width: "100%",
            }}
            onChange={handleOnChangeRightCoin}
            onBlur={handleOnBlurRightCoin}
            value={rightCoinDescription}
          />

          {showRightSearch && (
            <div className="converter-results">
              <ul className="list-group converter-items mt-3">
                {rightCoinSearchItems &&
                  rightCoinSearchItems.coins &&
                  rightCoinSearchItems.coins.map((coin) => (
                    <li
                      key={coin.id}
                      className={`list-group-item list-group-item-action pointer`}
                      onClick={() => handleOnClickRightCoin(coin)}
                    >
                      <span onClick={() => handleOnClickRightCoin(coin)}>
                        {coin.name}
                      </span>
                      {coin.market_cap_rank && (
                        <span className="ml-1">
                          <small>({coin.market_cap_rank})</small>
                        </span>
                      )}
                      <p
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        <span className="mr-1">
                          <img src={coin.thumb} alt="coin logo" />
                        </span>
                        <span>{coin.symbol}</span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
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
            <Grid item>
              <Typography component="span">
                {`${amountToConvert} ${selectedLeftCoin.name} (${selectedLeftCoin.symbol})`}
              </Typography>
              <Typography component="span" ml={2} mr={2}>
                =
              </Typography>
              <Typography component="span" variant="h6" mr={1}>
                {selectedLeftCurrentPrice &&
                  selectedRightCurrentPrice &&
                  converterCoinHelper(
                    parseInt(amountToConvert),
                    selectedLeftCurrentPrice,
                    selectedRightCurrentPrice
                  )}
              </Typography>
              <Typography component="span">
                {`${
                  selectedRightCoin.name
                } (${selectedRightCoin.symbol.toUpperCase()})`}
              </Typography>
            </Grid>
          </Grid>
        )}
    </Container>
  );
};
