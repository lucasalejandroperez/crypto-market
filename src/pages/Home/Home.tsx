import { useMarketCap } from "../../hooks/useMarketCap";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";

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

  return (
    <div>
      {
        marketCap?.map( ( coin: ICoinGeckoInterfaces ) => (
          <div>
            { coin.name } - { coin.market_cap }
          </div>
        ))
      }
    </div>
  )
}
