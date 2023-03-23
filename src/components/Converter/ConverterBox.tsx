import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { NumberFormatCustom } from "../NumberFormatCustom/NumberFormatCustom";
import { ConvertedCoinText } from "./ConvertedCoinText";
import { SearchCoin } from "./SearchCoin";
import { useAmountToConvert } from "../../hooks/Converter/useAmountToConvert";
import { useConverter } from "../../hooks/Converter/useConverter";

import "./ConverterBox.css";

export const ConverterBox = () => {
  const { amountToConvert, handleOnChangeAmountToConvert } =
    useAmountToConvert("1");

  const {
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
    handleOnClickInvertCoins,
  } = useConverter();

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
