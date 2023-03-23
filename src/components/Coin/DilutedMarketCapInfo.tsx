import React from "react";
import { Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import { consts } from "../../consts/consts";
import { ICoin } from "../../models/coinInterfaces";

interface Props {
  market_data: ICoin["market_data"];
}

export const DilutedMarketCapInfo = ({ market_data }: Props) => {
  return (
    <>
      <Typography>
        {consts.DETAIL.FULLY_DILUTED_MARKET_CAP}
        <Tooltip title={consts.DETAIL.FULLY_DILUTED_MARKET_CAP_TOOLTIP}>
          <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
        </Tooltip>
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        {market_data.fully_diluted_valuation.usd
          ? `$${market_data.fully_diluted_valuation.usd?.toLocaleString(
              undefined,
              { maximumFractionDigits: 2 }
            )}`
          : `--`}
      </Typography>
    </>
  );
};
