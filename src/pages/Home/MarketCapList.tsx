import { useContext, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { consts } from "../../consts/consts"
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";
import { useMarketCap, useMutateMarketData } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { MarketCapItem } from "./MarketCapItem";

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

    if ( isFetching ) {
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
