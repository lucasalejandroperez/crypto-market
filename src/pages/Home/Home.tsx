import { Grid, TextField } from "@mui/material";
import { useMarketCap } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { consts } from '../../consts/consts';
import { MarketCapItem } from "./MarketCapItem";

export const Home = () => {

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
  } = useMarketCap();

  if ( isLoading ) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if ( error ) {
    return (
      <section>
        Error fetching market cap: { error.message }
      </section>
    )
  }

    const data = [
      { 
        id: 1, 
        col1: 1, // Rank
        col2: 'Bitcoin BTC', // Name
        col3: '47,524', // Actual price
        col4: '48,26', // high 24h
        col5: '42,38', // low 24h
        col6: '902,615,226,509',  // Market cap
        col7: '41,483,338,205', // Volume
        col8: '69,448', // Ath
        col9: '18,996,218', // circulating supply
        col10: '21,000,000' , // total supply
      },
      
    ]
 

  return (
    <div>
      <TextField id="standard-basic" label={ consts.HOME.SEARCH } variant="standard" />

            {/* <div className="container mb-2">
                <input 
                    name="searchCoin" 
                    type="search" 
                    className="form-control" 
                    ref={ inputRef } 
                    placeholder={t('general.search_a_coin')} 
                    autoComplete="false"
                    onChange={ handleOnChangeCoin }
                />
            </div> */}
      <div className="col-12 mt-4 mb-4">
            <div className="text-center">{ consts.HOME.SUBTITLE }</div>

            {
                marketCap?.map( (coin: ICoinGeckoInterfaces) => (
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
