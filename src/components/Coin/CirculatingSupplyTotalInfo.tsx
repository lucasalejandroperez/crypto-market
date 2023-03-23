import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import { consts } from "../../consts/consts";
import { ICoin } from "../../models/coinInterfaces";
import LinearWithValueLabel from "../LinearProgressWithLabel/LinearWithValueLabel";
import { getPercentageCirculatingSupply } from "../../utilities/contractUtils";

interface Props {
  market_data: ICoin["market_data"];
}

export const CirculatingSupplyTotalInfo = ({ market_data }: Props) => {
  return (
    <>
      <Box
        sx={{
          marginBottom: 1,
        }}
      >
        <Typography>
          {consts.DETAIL.CIRCULATING_SUPPLY}
          <Tooltip title={consts.DETAIL.CIRCULATING_SUPPLY_TOOLTIP}>
            <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
          </Tooltip>
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {market_data.circulating_supply.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </Typography>

        {market_data.circulating_supply && market_data.max_supply && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <LinearWithValueLabel
              value={getPercentageCirculatingSupply(
                market_data.circulating_supply,
                market_data.max_supply
              )}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          marginBottom: 1,
        }}
      >
        <Typography>
          {consts.DETAIL.TOTAL_SUPPLY}
          <Tooltip title={consts.DETAIL.TOTAL_SUPPLY_TOOLTIP}>
            <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
          </Tooltip>
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {"total_supply" in market_data && market_data.total_supply
            ? market_data.total_supply?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            : `--`}
        </Typography>
      </Box>

      <Typography>
        {consts.DETAIL.MAX_SUPPLY}
        <Tooltip title={consts.DETAIL.MAX_SUPPLY_TOOLTIP}>
          <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
        </Tooltip>
      </Typography>
      <Typography
        sx={{
          fontWeight: "bold",
        }}
      >
        {market_data.max_supply
          ? market_data.max_supply?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          : `--`}
      </Typography>
    </>
  );
};
