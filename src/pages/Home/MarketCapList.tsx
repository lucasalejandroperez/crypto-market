import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { consts } from "../../consts/consts"
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";
import { useMarketCap, useMutateMarketData } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { MarketCapItem } from "./MarketCapItem";
import { setPositiveNegativeClass } from '../../utilities/numbers';

export const MarketCapList = () => {

    const { orderBy } = useContext(MarketCapContext);

    const {
        data: marketCap, 
        error, 
        isLoading, 
        isError, 
        isSuccess, 
        status, 
        isIdle, 
        isFetching,
        refetch 
    } = useMarketCap(orderBy);
  
    useEffect(() => {
        refetch();
    }, [orderBy])
  

    if ( isLoading ) {
        return (
            <Loader />
        )
    }
    
    if ( error ) {
        return (
          <section>
            Error fetching market cap: { error.message }
          </section>
        )
    }

  return (
    <div>
        <Box>
            <Typography sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                { consts.HOME.SUBTITLE }
            </Typography>
        </Box>
        <Box>
            <Grid container>
                
                <Box component={ Grid } item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } display={{ xs: 'block' }}>
                    <Typography>
                    #
                    </Typography>
                </Box>
                <Box component={ Grid } item xs={ 5 } sm={ 5 } md={ 3 } lg={ 2 } display={{ xs: 'block' }}>
                    <Typography>
                        { consts.MARKET_CAP_LIST.NAME }
                    </Typography>
                </Box>
                <Box component={ Grid } item xs={ 4 } sm={ 3 } md={ 2 } lg={ 2 } display={{ xs: 'block' }}>
                    <Typography>
                        { consts.MARKET_CAP_LIST.PRICE }
                    </Typography>
                </Box>
                <Box component={ Grid } item xs={ 2 } sm={ 2 } md={ 1 } lg={ 1 } display={{ xs: 'block' }}>
                    <Typography>
                        24h %
                    </Typography>
                </Box>
                <Box component={ Grid } item          sm={ 1 } md={ 1 } lg={ 1 } display={{ xs: 'none', sm: 'block' }}>
                    <Typography>
                        7d %
                    </Typography>
                </Box>
                <Box component={ Grid } item                   md={ 2 } lg={ 2 } display={{ xs: 'none', sm: 'none', md: 'block' }}>
                    <Typography>
                        { consts.MARKET_CAP_LIST.MARKET_CAP }
                    </Typography>
                </Box>
                <Box component={ Grid } item                   md={ 2 } lg={ 2 } display={{ xs: 'none', sm: 'none', md: "block" }}>
                    <Typography>
                        { consts.MARKET_CAP_LIST.CIRCULATING_SUPPLY }
                    </Typography>
                </Box>
                <Box component={ Grid } item                            lg={ 1 } display={{ xs: 'none', sm: 'none', md: "none", lg: "block" }}>
                    <Typography>
                        { consts.MARKET_CAP_LIST.ATH }
                    </Typography>
                </Box>

                {
                    marketCap &&
                    marketCap.map( (coin: ICoinGeckoInterfaces) => (
                        <React.Fragment 
                            key={ coin.id }
                        >
                            <Box component={ Grid } item xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } display={{ xs: 'block' }}>
                                { coin.market_cap_rank }
                            </Box>
                            <Box component={ Grid } item xs={ 5 } sm={ 5 } md={ 3 } lg={ 2 } display={{ xs: 'block' }}>
                                {/* TODO: It must be a component */}
                                <img src={ coin.image } alt="logo"width="25" height="25" />
                                <Typography component="span" ml={ 1 }>
                                    { coin.name } { coin.symbol.toUpperCase() }
                                </Typography>
                            </Box>
                            <Box component={ Grid } item xs={ 4 } sm={ 3 } md={ 2 } lg={ 2 } display={{ xs: 'block' }}>
                                <Typography>
                                    ${ coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 6 }) }
                                </Typography>
                            </Box>
                            <Box component={ Grid } item xs={ 2 } sm={ 2 } md={ 1 } lg={ 1 } display={{ xs: 'block' }}>
                                <Typography
                                    sx={{
                                        color: setPositiveNegativeClass( coin.price_change_percentage_24h ),
                                    }}
                                >
                                    { coin.price_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits:2 }) }%
                                </Typography>
                            </Box>
                            <Box component={ Grid } item          sm={ 1 } md={ 1 } lg={ 1 } display={{ xs: 'none', sm: 'block' }}>
                                <Typography
                                    sx={{
                                        color: setPositiveNegativeClass( coin.price_change_percentage_7d_in_currency ),
                                    }}
                                >
                                    { coin.price_change_percentage_7d_in_currency.toLocaleString(undefined, { maximumFractionDigits:2 }) }%
                                </Typography>
                            </Box>
                            <Box component={ Grid } item                   md={ 2 } lg={ 2 } display={{ xs: 'none', sm: 'none', md: 'block' }}>
                                <Typography>
                                    ${ coin.market_cap.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                                </Typography>
                            </Box>
                            <Box component={ Grid } item                   md={ 2 } lg={ 2 } display={{ xs: 'none', sm: 'none', md: "block" }}>
                                {/* TODO: It must be a component */}
                                <Typography>
                                    { coin.circulating_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) } { coin.symbol.toUpperCase() }
                                </Typography>
                            </Box>
                            <Box component={ Grid } item                            lg={ 1 } display={{ xs: 'none', sm: 'none', md: "none", lg: "block" }}>
                                <Typography>
                                    ${ coin.ath.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                                </Typography>
                            </Box>
                        </React.Fragment>

                    )) 
                }
            </Grid>
        </Box>
        <div>
            {
                marketCap &&
                marketCap.map( (coin: ICoinGeckoInterfaces) => (
                        <MarketCapItem
                            key={ coin.id }
                            { ...coin }
                        />   
                    ))
            }
        </div>
    </div>
  )
}
