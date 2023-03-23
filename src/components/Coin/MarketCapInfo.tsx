import React from "react";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { grey } from "@mui/material/colors";
import { setPositiveNegativeClass } from "../../utilities/numbers";
import { consts } from "../../consts/consts";
import { ICoin } from "../../models/coinInterfaces";

interface Props {
  market_data: ICoin["market_data"];
}

export const MarketCapInfo = ({ market_data }: Props) => {
  return (
    <>
      <Typography>
        {consts.DETAIL.MARKET_CAP}
        <Tooltip title={consts.DETAIL.MARKET_CAP_TOOLTIP}>
          <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
        </Tooltip>
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        $
        {market_data.market_cap.usd.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
      </Typography>
      <Typography
        sx={{
          color: setPositiveNegativeClass(market_data.market_cap_change_24h),
          fontWeight: "bold",
        }}
      >
        {market_data.market_cap_change_percentage_24h.toLocaleString(
          undefined,
          { maximumFractionDigits: 2 }
        )}
        %
      </Typography>
    </>
  );
};
