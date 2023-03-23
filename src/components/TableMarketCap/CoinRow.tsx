import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CirculatingSupply } from "../CirculatingSupply/CirculatingSupply";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { setPositiveNegativeClass } from "../../utilities/numbers";

interface Props {
  coin: ICoinGeckoInterfaces;
  handleCoinDetailOnClick: (id: string) => void;
}

export const CoinRow = ({ coin, handleCoinDetailOnClick }: Props) => {
  return (
    <Box
      component={Grid}
      item
      key={coin.id}
      xs={12}
      sx={{
        borderTop: "1px solid #eff2f5",
        paddingTop: 2,
        paddingBottom: 2,
        minHeight: "80px",
        "&:hover": {
          backgroundColor: "#eff4f7",
        },
      }}
    >
      <Grid container>
        <Box
          component={Grid}
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {coin.market_cap_rank}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={5}
          sm={5}
          md={3}
          lg={2}
          display={{ xs: "block" }}
        >
          <Box
            component="span"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleCoinDetailOnClick(coin.id)}
          >
            <img src={coin.image} alt="logo" width="25" height="25" />
          </Box>
          <Typography
            component="span"
            ml={1}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleCoinDetailOnClick(coin.id)}
          >
            <Typography
              component="span"
              mr={1}
              sx={{
                fontWeight: "bold",
              }}
            >
              {coin.name}
            </Typography>
            <Typography
              component="span"
              sx={{
                color: grey[600],
              }}
            >
              {coin.symbol.toUpperCase()}
            </Typography>
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          display={{ xs: "block" }}
        >
          <Typography>
            $
            {coin.current_price?.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={2}
          sm={2}
          md={1}
          lg={1}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              color: setPositiveNegativeClass(coin.price_change_percentage_24h),
            }}
          >
            {coin.price_change_percentage_24h?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
            %
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          sm={1}
          md={1}
          lg={1}
          display={{ xs: "none", sm: "block" }}
        >
          <Typography
            sx={{
              color: setPositiveNegativeClass(
                coin.price_change_percentage_7d_in_currency
              ),
            }}
          >
            {coin.price_change_percentage_7d_in_currency?.toLocaleString(
              undefined,
              { maximumFractionDigits: 2 }
            )}
            %
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          md={2}
          lg={2}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Typography>
            $
            {coin.market_cap?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          md={2}
          lg={2}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <CirculatingSupply
            circulating_supply={coin.circulating_supply}
            max_supply={coin.max_supply}
            symbol={coin.symbol}
          />
        </Box>
        <Box
          component={Grid}
          item
          lg={1}
          display={{
            xs: "none",
            sm: "none",
            md: "none",
            lg: "block",
          }}
        >
          <Typography>
            $
            {coin.ath?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};
