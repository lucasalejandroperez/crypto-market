import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { Chip, Container, Grid, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";

import CoinGecko from "../../api/coinGeckoApi";
import { ICoin } from "../../models/coinInterfaces";
import { consts } from "../../consts/consts";
import { RenderHTMLComponent } from "../../components/RenderHTMLComponent/RenderHTMLComponent";
import { setPositiveNegativeClass } from "../../utilities/numbers";
import { PriceCoin } from "../../components/Coin/PriceCoin";
import { ContractCoinDetail } from "../../components/Coin/ContractCoinDetail";
import { MarketCapInfo } from "../../components/Coin/MarketCapInfo";
import { DilutedMarketCapInfo } from "../../components/Coin/DilutedMarketCapInfo";
import { CirculatingSupplyTotalInfo } from "../../components/Coin/CirculatingSupplyTotalInfo";

export const CoinDetail = () => {
  const [coin, setCoin] = useState<ICoin>();
  const params = useParams();

  const getCoinData = async (id: string): Promise<ICoin> => {
    return await CoinGecko.CoinGecko.getCoin(id);
  };

  useEffect(() => {
    if (params.coinId) {
      getCoinData(params.coinId)
        .then((value) => {
          setCoin(value);
        })
        .catch((error) => {
          console.log("Rejected: ", error);
        });
    }
  }, [params.coinId]);

  return (
    <>
      {coin && (
        <Container maxWidth="xl">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={0.5}
          >
            <Grid item xs={12} md={4}>
              <Typography variant="h4" component="span" ml={1}>
                <img src={coin.image?.thumb} alt="Logo" />
              </Typography>
              <Typography variant="h4" component="span" ml={1}>
                {coin.name}
              </Typography>
              <Typography variant="caption" component="span" ml={1} mr={1}>
                {coin.symbol.toUpperCase()}
              </Typography>
              <Chip
                label={`${consts.DETAIL.RANK} #${coin.market_cap_rank}`}
                sx={{ backgroundColor: grey[400] }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <PriceCoin
                name={coin.name}
                symbol={coin.symbol}
                market_data={coin.market_data}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                borderTop: "1px solid #c8c8c8",
                marginTop: 1,
              }}
            >
              <ContractCoinDetail
                platforms={coin.platforms}
                links={coin.links}
                categories={coin.categories}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                border: "1px solid #c8c8c8",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <MarketCapInfo market_data={coin.market_data} />
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                border: "1px solid #c8c8c8",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <DilutedMarketCapInfo market_data={coin.market_data} />
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                border: "1px solid #c8c8c8",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <CirculatingSupplyTotalInfo market_data={coin.market_data} />
            </Grid>

            <Grid item xs={12}>
              <Typography>
                {consts.HOME.ATH}
                <Tooltip title={consts.DETAIL.ATH_TOOLTIP}>
                  <InfoIcon sx={{ color: grey[500] }} fontSize="small" />
                </Tooltip>
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                }}
                mr={1}
              >
                $
                {coin.market_data.ath.usd.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography component="span">
                (
                {format(
                  new Date(coin.market_data.ath_date.usd),
                  "dd/MM/yyyy HH:mm"
                )}
                )
              </Typography>
              <Typography
                sx={{
                  color: setPositiveNegativeClass(
                    coin.market_data.ath_change_percentage.usd
                  ),
                  fontWeight: "bold",
                }}
              >
                {coin.market_data.ath_change_percentage.usd.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                )}
                %
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Container
                sx={{
                  borderTop: "1px solid #2196f3",
                  paddingTop: 2,
                }}
              >
                {coin.description && coin.description?.en.trim().length > 0 && (
                  <Typography variant="h5">
                    {consts.DETAIL.DESCRIPTION}
                  </Typography>
                )}
                <RenderHTMLComponent html={coin.description?.en} />
              </Container>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
