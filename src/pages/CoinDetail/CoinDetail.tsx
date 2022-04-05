import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Chip, Container, Grid, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import InfoIcon from '@mui/icons-material/Info';

import CoinGecko from '../../api/coinGeckoApi';
import { ICoin } from "../../models/coinInterfaces";
import { CopyToClipboard } from "../../components/CopyToClipboard/CopyToClipboard";
import { consts } from '../../consts/consts';
import { RenderHTMLComponent } from '../../components/RenderHTMLComponent/RenderHTMLComponent';
import { getArrayContracts, IContractPlatformType, shortenContract } from "../../utilities/contractUtils";
import { SelectContract } from "../../components/SelectContract/SelectContract";
import { format } from 'date-fns';

export const Prueba = () => {
  return <div dangerouslySetInnerHTML={{__html: `<b>lolal</b>`}}></div>
}

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

  const isInvalidContract = ( contracts:any ): boolean => {

    let isInvalid = false;

    for (const [key, value] of Object.entries(contracts)) {
      
      if (key.trim() === '' && value === '') {
        isInvalid = true;
        break;
      }

    }

    return isInvalid;

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
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={ 0.5 }>
              
              
              <Grid item xs={ 12 } md={ 4 }>
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

              {/* PRICE */}
              {/* TODO: It must be a component */}
              <Grid item xs={ 12 } md={ 8 }>
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
                    { coin.market_data.current_price.usd.toLocaleString(undefined, { maximumFractionDigits: 6 }) }
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


              {/* CONTRACTS */}
              <Grid 
                item 
                xs={ 12 } 
                md={ 6 } 
                sx={{
                borderTop: '1px solid grey',
                marginTop: 1
                }}
              >

                {/* CONTRACTS */}
                {/* TODO: It must be a component */}
                {
                  !isInvalidContract(coin.platforms) &&
                    <Typography component="div">
                      {  consts.DETAIL.CONTRACTS }:
                    </Typography>
                }
                {/* TODO: It must be a component */}
                {
                  !isInvalidContract(coin.platforms) &&
                  getArrayContracts(coin.platforms).slice(0, 1).map( ( platform:IContractPlatformType ) => (
                    <span
                      key={ platform.key }
                    >
                      <Chip 
                        sx={{ 
                          flexDirection: 'row-reverse',
                          paddingLeft: 0.5,
                          paddingRight: 2,
                          marginRight: 1
                        }}
                        icon={ 
                          <CopyToClipboard text={ `${ platform.valor }` } />
                        }
                        label={ `${ platform.key }: ${ shortenContract(platform.valor) }` }
                      />

                    </span>
                  ))
                }
                {
                  // TODO: To show this, It must be more than 1
                  !isInvalidContract(coin.platforms) &&
                    <SelectContract platforms={ coin.platforms } />
                }


                <Box
                  sx={{ 
                    marginTop: 1
                  }}
                >
                {/* SITES */}
                {/* TODO: IT must be a component */}
                {
                  coin.links && coin.links.homepage && coin.links.homepage.length > 0 &&
                  <Typography component="span">
                    { consts.DETAIL.SITE }:  
                  </Typography>
                }
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
                </Box>

                <Box
                  sx={{ 
                    marginTop: 1
                  }}
                >
                {/* CATEGORIES */}
                {/* TODO: It must be a component */}
                {
                  coin.categories && coin.categories.length > 0 &&
                  <Typography component="span" mr={ 1 }>
                    {  consts.DETAIL.TAGS }:
                  </Typography>
                }
                {
                  coin.categories.filter(category => category && category !== null).map( tag => (
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
                </Box>
              </Grid>

              {/* MARKET CAP */}
              {/* TODO: It must be a component */}
              <Grid item xs={ 12 } md={ 2 } sx={{
                border: '1px solid grey',
                marginTop: 1,
                marginBottom: 1
              }}>
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
                    ${ coin.market_data.market_cap.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
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

              {/* FULLY DILUTED MARKET CAP */}
              {/* TODO: It must be a component */}
              <Grid item xs={ 12 } md={ 2 } sx={{
                border: '1px solid grey',
                marginTop: 1,
                marginBottom: 1
              }}>
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
                  { 
                    coin.market_data.fully_diluted_valuation.usd ? 
                    `$${coin.market_data.fully_diluted_valuation.usd?.toLocaleString(undefined, { maximumFractionDigits:2 })}` 
                    : `--`
                  }
                </Typography>
              </Grid>


              <Grid item xs={ 12 } md={ 2 } sx={{
                border: '1px solid grey',
                marginTop: 1,
                marginBottom: 1
              }}>
                {/* CIRCULATING SUPLY/TOTAL */}
                {/* TODO: It must be a component */}
                <Box sx={{
                  marginBottom: 1
                }}>
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
                </Box>

                <Box
                  sx={{
                    marginBottom: 1
                  }}
                >
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
                    { 'total_supply' in coin.market_data && 
                      coin.market_data.total_supply ?
                      coin.market_data.total_supply?.toLocaleString(undefined, { maximumFractionDigits:2 })  
                      : `--`
                    }
                  </Typography>
                </Box>


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
                  { 
                    coin.market_data.max_supply ?
                    coin.market_data.max_supply?.toLocaleString(undefined, { maximumFractionDigits:2 }) 
                    : `--`
                  }
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
                  ${ coin.market_data.ath.usd.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                </Typography>
                <Typography component="span">
                  ({ format(new Date(coin.market_data.ath_date.usd), 'dd/MM/yyyy HH:mm') })
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
                <Container
                  sx={{ 
                    borderTop: '1px solid #2196f3',
                    paddingTop: 2
                  }}
                >
                {
                  coin.description && coin.description?.en.trim().length > 0 &&
                    <Typography variant="h5">
                      { consts.DETAIL.DESCRIPTION }
                    </Typography>
                }
                <RenderHTMLComponent html={ coin.description?.en } />

                </Container>
              </Grid>
            </Grid>
          </Container>
      }
    </>    
  )
}
