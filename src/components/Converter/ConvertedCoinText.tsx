import React from "react";
import { Grid, Typography } from "@mui/material";
import { converterCoinHelper } from "../../utilities/coinHelper";

interface Props {
  amount: string;
  nameLeftCoin: string;
  symbolLeftCoin: string;
  priceLeftCoin: number;
  nameRightCoin: string;
  symbolRightCoin: string;
  priceRightCoin: number;
}

export const ConvertedCoinText = ({
  amount,
  nameLeftCoin,
  symbolLeftCoin,
  priceLeftCoin,
  nameRightCoin,
  symbolRightCoin,
  priceRightCoin,
}: Props) => {
  return (
    <Grid item>
      <Typography component="span">
        {`${amount} ${nameLeftCoin} (${symbolLeftCoin})`}
      </Typography>
      <Typography component="span" ml={2} mr={2}>
        =
      </Typography>
      <Typography component="span" variant="h6" mr={1}>
        {priceLeftCoin &&
          priceRightCoin &&
          converterCoinHelper(parseInt(amount), priceLeftCoin, priceRightCoin)}
      </Typography>
      <Typography component="span">
        {`${nameRightCoin} (${symbolRightCoin.toUpperCase()})`}
      </Typography>
    </Grid>
  );
};
