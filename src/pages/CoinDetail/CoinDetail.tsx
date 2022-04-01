import { useEffect, useState } from "react";
import CoinGecko from '../../api/coinGeckoApi';
import { ICoin } from "../../models/coinInterfaces";
import { useParams } from "react-router-dom";

export const CoinDetail = () => {

  const [coin, setCoin] = useState<ICoin>();
  const params = useParams();

  const getCoinData = async( id:string ): Promise<ICoin> => {
    return await CoinGecko.CoinGecko.getCoin( id );
  }

  useEffect(() => {
    
      // TODO: duplicate code, move, refactor
      if (params.coinId) {
        getCoinData(params.coinId).then( (value) => {
          setCoin( value );
        }).catch( (error) => {
          console.log('Rejected: ', error);
        });
      }

  }, []);

  useEffect(() => {
    
    // TODO: duplicate code, move, refactor
    if (params.coinId) {
      getCoinData(params.coinId).then( (value) => {
        setCoin( value );
      }).catch( (error) => {
        console.log('Rejected: ', error);
      });
    }

  }, [params.coinId])
  
  

  return (
    <>
      {
        coin &&
          <div className="mt-2">
            <div>{ coin.image?.thumb }</div>
            <div>{ coin.name }</div>
            <div>{ coin.symbol }</div>
            <div>{ coin.market_cap_rank }</div>


            <div>{ coin.categories }</div>
            <div>contrato:{ coin.asset_platform_id }</div>
            <div>{ coin.links?.homepage }</div>

            
            {/* <div>{ coin.market_data.total_supply  }</div> */}
            <div>{ 'total_supply' in coin.market_data && coin.market_data.total_supply  }</div>
            <div>{ coin.market_data.max_supply }</div>
            <div>{ coin.market_data.circulating_supply }</div>


            <div>Price of { coin.name } ({ coin.symbol }){ coin.market_data.current_price.usd }</div>
            <div>{ coin.market_data.price_change_percentage_24h }</div>


            <div>Market cap: { coin.market_data.market_cap.usd }</div>
            <div>High 24h: { coin.market_data.high_24h.usd }</div>
            <div>Low 24h: { coin.market_data.low_24h.usd }</div>
            <div>Volume: { coin.market_data.total_volume.usd }</div>
            <div>{ coin.market_data.price_change_24h }</div>
            

            <div>{ coin.market_data.price_change_percentage_7d }</div>
            <div>{ coin.market_data.price_change_percentage_14d }</div>
            <div>{ coin.market_data.price_change_percentage_30d }</div>
            <div>{ coin.market_data.price_change_percentage_60d }</div>
            <div>{ coin.market_data.price_change_percentage_1y }</div>
            

            <div>ATH: { coin.market_data.ath.usd }</div> 
            <div>ATH Date: { coin.market_data.ath_date.usd }</div>
            <div>{ coin.market_data.ath_change_percentage.usd }</div> 


            <div>{ coin.description?.en }</div>
          </div>
      }
    </>

    
  )
}
