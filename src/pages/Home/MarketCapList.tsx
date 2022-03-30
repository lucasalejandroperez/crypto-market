import { useEffect } from "react";
import { consts } from "../../consts/consts"
import { useMarketCap, useMutateMarketData } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { MarketCapItem } from "./MarketCapItem";

export const MarketCapList = ( selectOrderBy:any ) => {

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
    } = useMarketCap(selectOrderBy);
  
    const { 
      mutate, 
      error:errorMutate, 
      isLoading:isLoadingMutate, 
      isSuccess:isSuccessMutate, 
      //mutateAsync,
      reset
    } = useMutateMarketData(selectOrderBy);

    useEffect(() => {
    
    refetch();

    }, [selectOrderBy])
  
    

    if ( isLoading ) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        )
      }
    
      if ( isLoadingMutate ) {
        return (
          <div>
            <h1>Loading mutate...</h1>
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

  return (
    <div>
        <div className="text-center">{ consts.HOME.SUBTITLE }</div>
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
  )
}