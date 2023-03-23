import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { consts } from "../../consts/consts";
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";
import { useMarketCap } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { useNavigate } from "react-router-dom";
import { CoinRow } from "../../components/TableMarketCap/CoinRow";
import { TableHeader } from "../../components/TableMarketCap/TableHeader";

export const MarketCapList = () => {
  const { orderBy } = useContext(MarketCapContext);
  const navigate = useNavigate();

  const { data: marketCap, error, isLoading, refetch } = useMarketCap(orderBy);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCoinDetailOnClick = (id: string) => {
    navigate(`coin/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section>
        {`Error fetching market cap. It's possible that you need to wait until the
        API from coingecko response... try later.`}
        : {error.message}
      </section>
    );
  }

  return (
    <div>
      <Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          mb={1}
        >
          {consts.HOME.SUBTITLE}
        </Typography>
      </Box>
      <Box>
        <Grid container direction="row">
          <TableHeader />
          {marketCap &&
            marketCap.map((coin: ICoinGeckoInterfaces) => (
              <CoinRow
                coin={coin}
                handleCoinDetailOnClick={handleCoinDetailOnClick}
              />
            ))}
        </Grid>
      </Box>
    </div>
  );
};
