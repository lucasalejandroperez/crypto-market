import { useContext } from "react";
import { MarketCapContext } from '../../context/marketCap/MarketCapContext';

export const CoinDetail = () => {

  const { coinId, coinDetail:coin } = useContext( MarketCapContext );

  
  // const {
  //   data:coin, 
  //   error, 
  //   isLoading, 
  //   isError, 
  //   isSuccess, 
  //   status, 
  //   isIdle, 
  //   isFetching,
  //   refetch 
  // } = useGetCoin( coinId.toString() );

  // useEffect(() => {
  //   refetch();
  // }, [coinId]);

  return (
    <>
      {
        coin &&
          <div className="mt-2">
          <div>CoinDetail</div>
          <div>{ coin.name }</div>
          <div>{ coin.symbol }</div>
          {/* <div>{ coin.description.en }</div>
          <div>{ coin.links.homepage }</div>
          <div>{ coin.image.thumb }</div>
          <div>{ coin.image.large }</div>
          <div>{ coin.genesis_date }</div>
          <div>{ coin.market_cap_rank }</div>
          <div>{ coin.market_data.market_cap.usd }</div>
          <div>{ coin.market_data.current_price.usd }</div>
          <div>{ coin.market_data.ath.usd }</div> 
          <div>{ coin.market_data.ath_date.usd }</div>
          <div>{ coin.market_data.ath_change_percentage.usd }</div> 
          <div>{ coin.market_data.total_volume.usd }</div>
          <div>{ coin.market_data.high_24h.usd }</div>
          <div>{ coin.market_data.low_24h.usd }</div>
          <div>{ coin.market_data.price_change_24h }</div>
          <div>{ coin.market_data.price_change_percentage_24h }</div>
          <div>{ coin.market_data.price_change_percentage_7d }</div>
          <div>{ coin.market_data.price_change_percentage_14d }</div>
          <div>{ coin.market_data.price_change_percentage_30d }</div>
          <div>{ coin.market_data.price_change_percentage_60d }</div>
          <div>{ coin.market_data.price_change_percentage_1y }</div>
          <div>{ coin.market_data.total_supply }</div>
          <div>{ coin.market_data.max_supply }</div>
          <div>{ coin.market_data.circulating_supply }</div>
          <div>{ coin.categories }</div>
          <div>{ coin.block_time_in_minutes }</div> */}
        </div>
      }
    </>

    
  )
}
