import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Chip, Container, Grid, LinearProgress, Tooltip, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import InfoIcon from '@mui/icons-material/Info';

import CoinGecko from '../../api/coinGeckoApi';
import { ICoin } from "../../models/coinInterfaces";
import { CopyToClipboard } from "../../components/CopyToClipboard/CopyToClipboard";
import { consts } from '../../consts/consts';

export const CoinDetail = () => {

  const [coin, setCoin] = useState<ICoin>();
  const params = useParams();

  const getCoinData = async( id:string ): Promise<ICoin> => {
    return await CoinGecko.CoinGecko.getCoin( id );
  }

  useEffect(() => {
    
      // TODO: duplicated code, move, refactor
      if (params.coinId) {
        getCoinData(params.coinId).then( (value) => {
          setCoin( value );
        }).catch( (error) => {
          console.log('Rejected: ', error);
        });
      }

  }, []);

  useEffect(() => {
    
    // TODO: duplicated code, move, refactor
    if (params.coinId) {
      getCoinData(params.coinId).then( (value) => {
        setCoin( value );
      }).catch( (error) => {
        console.log('Rejected: ', error);
      });
    }

  }, [params.coinId])

  interface IContractPlatformType {
    key: string;
    valor: unknown;
  }


  
  const getContracts = ( contracts:any ): IContractPlatformType[] => {
    let contractList:IContractPlatformType[] = [];

    for (const [key, value] of Object.entries(contracts)) {
      
      const newContract: IContractPlatformType = {
        key,
        valor: value
      };
      contractList.push(newContract);

    }

    return contractList;
  }

  // TODO: Move to utils
  const setPositiveNegativeClass = ( amount:number ):string => {

    const symbolNumber = Math.sign( amount );

    if ( symbolNumber === 1 ) {
        return '#00c853';
    }
    else if ( symbolNumber === -1 ) {
        return '#ff5252';
    }
    else {
        return '#000000';
    }

};

  

  return (
    <>
      {
        coin &&
          <Container maxWidth="xl">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={ 12 }>

                {/* It must be a component */}
                <Typography variant="h4" component="span" ml={ 1 }>
                  <img src={ coin.image?.thumb } alt="Logo" />
                </Typography>
                <Typography variant="h4" component="span" ml={ 1 }>
                  { coin.name }
                </Typography>
                <Typography variant="caption" component="span" ml={ 1 } mr={ 1 }>
                  { coin.symbol.toUpperCase() }
                </Typography>
                <Chip 
                  label={ `${ consts.DETAIL.RANK } #${ coin.market_cap_rank }` } 
                  sx={{ backgroundColor: grey[400] }} 
                  size="small"
                />


              </Grid>
              <Grid item xs={ 12 }>

                {/* It must be a component */}
                <Typography component="span" mr={ 1 }>
                  { consts.DETAIL.TAGS }: 
                </Typography>
                {
                  coin.categories.map( tag => (
                    <Typography 
                      mr={ 1 } 
                      component="span" 
                      key={ tag }
                    >
                      <Chip 
                        label={ `${ tag }` } 
                        size="small"
                      />
                    </Typography>
                  ))
                }

              </Grid>
              <Grid item xs={ 12 }>

                { consts.DETAIL.CONTRACTS }:

                {/* TODO: It must be a component */}
                {
                  getContracts(coin.platforms).map( ( platform:IContractPlatformType ) => (
                    <div
                      key={ platform.key }
                    >
                      <Chip 
                        sx={{ 
                          
                          flexDirection: 'row-reverse',
                          paddingLeft: 0.5,
                          paddingRight: 2,
                        }}
                        icon={ 
                          <CopyToClipboard text={ `${ platform.valor }` } />
                        }
                        label={ `${ platform.key }: ${ platform.valor }` }
                      />
                    </div>
                  ))
                }
              </Grid>

              <Grid item xs={ 12 }>
                  { consts.DETAIL.SITE }:  
                  {
                    coin.links?.homepage.length > 0 && 
                      <Chip 
                        clickable 
                        avatar={ <img src="../assets/images/weblink.png" width="15" height="15" alt="link" /> }
                        label={ `${ coin.links?.homepage[0] }` } 
                        component="a" 
                        href={ `${ coin.links?.homepage[0] }` } 
                        sx={{ marginLeft: 1 }}
                      />
                  }
              </Grid>

              <Grid item xs={ 12 }>

                {/* TODO: It must be a component */}
                <Typography>
                  { consts.DETAIL.CIRCULATING_SUPPLY }
                  <Tooltip title={ consts.DETAIL.CIRCULATING_SUPPLY_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.circulating_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>

                {/* TODO: It must be a component */}
                <Typography>
                  { consts.DETAIL.TOTAL_SUPPLY }
                  <Tooltip title={ consts.DETAIL.TOTAL_SUPPLY_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  { 'total_supply' in coin.market_data && coin.market_data.total_supply.toLocaleString(undefined, { maximumFractionDigits:2 })  }
                </Typography>


                {/* TODO: It must be a component */}
                <Typography>
                  { consts.DETAIL.MAX_SUPPLY }
                  <Tooltip title={ consts.DETAIL.MAX_SUPPLY_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.max_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
                
              </Grid>

                {/* TODO: It must be a component */}
              <Grid item xs={ 12 }>
                <Typography>
                  { consts.DETAIL.PRICE_OF } { coin.name } ({ coin.symbol.toUpperCase() })
                </Typography>
                <Box
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center' 
                  }}
                >
                  <Typography variant="h4" component="span" mr={ 1 }>
                    { coin.market_data.current_price.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                  </Typography>
                  <Chip 
                    label={ `${ coin.market_data.price_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits:2 }) }%` } 
                    sx={{ 
                      backgroundColor: setPositiveNegativeClass(coin.market_data.price_change_percentage_24h),
                      color: '#FFFFFF',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
                <Typography 
                  component="span"
                >
                  { consts.GENERAL.LOW }:
                </Typography>
                <Typography 
                  component="span" 
                  mr={ 2 }
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.low_24h.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
                <Typography 
                  component="span"
                >
                  { consts.GENERAL.HIGH }:
                </Typography>
                <Typography 
                  component="span"
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.high_24h.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
              </Grid>

              {/* It must be a component */}
              <Grid item xs={ 12 }>
                <Typography>
                  { consts.DETAIL.MARKET_CAP }
                  <Tooltip title={ consts.DETAIL.MARKET_CAP_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold' }}
                >
                  { coin.market_data.market_cap.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
                <Typography
                  sx={{ 
                    color: setPositiveNegativeClass( coin.market_data.market_cap_change_24h ),
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.market_cap_change_percentage_24h.toLocaleString(undefined, { maximumFractionDigits:2 }) }%
                </Typography>
              </Grid>

              {/* It must be a component */}
              <Grid item xs={ 12 }>
                <Typography>
                  { consts.DETAIL.FULLY_DILUTED_MARKET_CAP }
                  <Tooltip title={ consts.DETAIL.FULLY_DILUTED_MARKET_CAP_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold' }}
                >
                  { coin.market_data.fully_diluted_valuation.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
              </Grid>

              <Grid item xs={ 12 }>
                <Typography>
                  { consts.HOME.ATH }
                  <Tooltip title={ consts.DETAIL.ATH_TOOLTIP }>
                    <InfoIcon 
                      sx={{ color: grey[500] }} 
                      fontSize="small"
                    />
                  </Tooltip>
                </Typography>
                <Typography
                  component="span"
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                  mr={ 1 }
                >
                  { coin.market_data.ath.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
                <Typography component="span">
                  ({ coin.market_data.ath_date.usd })
                </Typography>
                <Typography
                  sx={{
                    color: setPositiveNegativeClass( coin.market_data.ath_change_percentage.usd ),
                    fontWeight: 'bold'
                  }}
                >
                  { coin.market_data.ath_change_percentage.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }%
                </Typography>
              </Grid>

              <Grid item xs={ 12 }>
                <Typography variant="h5">
                  { consts.DETAIL.DESCRIPTION }
                </Typography>
                <Typography>
                  { coin.description?.en }
                </Typography>
              </Grid>
            </Grid>
          </Container>
      }
    </>

    
  )
}
