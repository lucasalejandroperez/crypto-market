import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import { consts } from "../../consts/consts";
import { ICoin } from "../../models/coinInterfaces";
import { setPositiveNegativeClass } from "../../utilities/numbers";

interface Props {
  name: string;
  symbol: string;
  market_data: ICoin["market_data"];
}

export const PriceCoin = ({ name, symbol, market_data }: Props) => {
  return (
    <>
      <Typography>
        {consts.DETAIL.PRICE_OF} {name} ({symbol.toUpperCase()})
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="span" mr={1}>
          {market_data.current_price.usd.toLocaleString(undefined, {
            maximumFractionDigits: 6,
          })}
        </Typography>
        <Chip
          label={`${market_data.price_change_percentage_24h.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          )}%`}
          sx={{
            backgroundColor: setPositiveNegativeClass(
              market_data.price_change_percentage_24h
            ),
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        />
      </Box>
      <Typography component="span">{consts.GENERAL.LOW}:</Typography>
      <Typography
        component="span"
        mr={2}
        sx={{
          fontWeight: "bold",
        }}
      >
        {market_data.low_24h.usd.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </Typography>
      <Typography component="span">{consts.GENERAL.HIGH}:</Typography>
      <Typography
        component="span"
        sx={{
          fontWeight: "bold",
        }}
      >
        {market_data.high_24h.usd.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </Typography>
    </>
  );
};
