import NumberFormat from "react-number-format";
import { consts } from "../../consts/consts";
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import {
  setCirculatingSupplyPercentage,
  setPercentageClass,
} from "../../utilities/coinHelper";
import "./MarketCapItem.css";

export const MarketCapItem = (coin: ICoinGeckoInterfaces) => {
  return (
    <div className="mb-1 container coinMarketItem__box">
      <div className="row">
        <div className="col-1 mb-1 bg-warning d-flex align-items-center justify-content-center">
          <span className="mr-1">{coin.market_cap_rank}</span>
          <span className="text-uppercase coinMarketItem__symbol">
            {coin.symbol}
          </span>
        </div>
        <div className="col-11 mb-1">
          <div className="row mt-2">
            <span className="col-3">
              <img
                src={coin.image}
                className="ml-1"
                alt="logo"
                width="25"
                height="25"
              />
              <span className="coinMarketItem__name ml-1">{coin.name}</span>
            </span>
            <span className="col-9 coinMarketItem__marketcap-box">
              <span className="coinMarketItem__marketcap-label mr-1">
                {consts.HOME.MARKET_CAP}:
              </span>
              <span>
                <NumberFormat
                  className="coinMarketItem__importantNumber"
                  value={coin.market_cap}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" US$"}
                />
              </span>
              <span className="ml-2">
                <small>
                  {consts.HOME.CHANGE_IN_LAST_24H} (
                  <NumberFormat
                    className={setPercentageClass(
                      coin.market_cap_change_percentage_24h
                    )}
                    value={coin.market_cap_change_percentage_24h}
                    displayType={"text"}
                    decimalScale={1}
                    suffix={"%"}
                  />
                  )
                </small>
              </span>
            </span>
          </div>
          <div className="row mt-2 mb-2">
            <span className="coinMarketItem__price-label ml-3 mr-3">
              {consts.HOME.CURRENT_PRICE}:
              <span className="ml-1">
                <NumberFormat
                  className="coinMarketItem__importantNumber"
                  value={coin.current_price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" US$"}
                />
              </span>
            </span>
            <span className="coinMarketItem__high-label mr-1">
              {consts.HOME.HIGH_LOW_IN_24H}:
            </span>
            <span>
              <NumberFormat
                className="coinMarketItem__green"
                value={coin.high_24h}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" US$"}
              />
            </span>
            <span className="coinMarketItem__low-label">/</span>
            <span>
              <NumberFormat
                className="coinMarketItem__red"
                value={coin.low_24h}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" US$"}
              />
            </span>
            <span className="ml-1">
              {" "}
              {consts.HOME.ATH}:
              <span className="ml-1">
                <NumberFormat
                  className="coinMarketItem__importantNumber"
                  value={coin.ath}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" US$"}
                />
              </span>
            </span>
          </div>
          <div className="row">
            <span className="coinMarketItem__priceChange1h-label mr-2 ml-3">
              {consts.HOME.PRICE_CHANGE_IN}
            </span>
            <span className="coinMarketItem__percentageBox">
              <span className="coinMarketItem__priceChange1h-label mr-2 ml-2">
                1h
              </span>
              <span className="mr-2">
                <NumberFormat
                  className={setPercentageClass(
                    coin.price_change_percentage_1h_in_currency
                  )}
                  value={coin.price_change_percentage_1h_in_currency}
                  displayType={"text"}
                  decimalScale={1}
                  suffix={"%"}
                />
              </span>
            </span>
            <span className="coinMarketItem__percentageBox">
              <span className="coinMarketItem__priceChange24h-label mr-2 ml-2">
                24h
              </span>
              <span className="mr-2">
                <NumberFormat
                  className={setPercentageClass(
                    coin.price_change_percentage_24h_in_currency
                  )}
                  value={coin.price_change_percentage_24h_in_currency}
                  displayType={"text"}
                  decimalScale={1}
                  suffix={"%"}
                />
              </span>
            </span>
            <span className="coinMarketItem__percentageBox">
              <span className="coinMarketItem__priceChange7d-label mr-2 ml-2">
                7d
              </span>
              <span className="mr-2">
                <NumberFormat
                  className={setPercentageClass(
                    coin.price_change_percentage_7d_in_currency
                  )}
                  value={coin.price_change_percentage_7d_in_currency}
                  displayType={"text"}
                  decimalScale={1}
                  suffix={"%"}
                />
              </span>
            </span>
            <span className="coinMarketItem__percentageBox">
              <span className="coinMarketItem__priceChange14d-label mr-2 ml-2">
                14d
              </span>
              <span className="mr-2">
                <NumberFormat
                  className={setPercentageClass(
                    coin.price_change_percentage_14d_in_currency!
                  )}
                  value={coin.price_change_percentage_14d_in_currency}
                  displayType={"text"}
                  decimalScale={1}
                  suffix={"%"}
                />
              </span>
            </span>
          </div>
          <div className="row">
            <span className="col-12 text-right">
              <span className="mr-2">
                <span className="coinMarketItem__circulatingSupply-label">
                  {consts.HOME.CIRCULATING_SUPPLY}:
                </span>
                <span className="ml-1">
                  <NumberFormat
                    value={coin.circulating_supply}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={0}
                  />
                  {coin.total_supply !== null ? (
                    <span className="ml-1">
                      <small>
                        (
                        <NumberFormat
                          value={setCirculatingSupplyPercentage(
                            coin.circulating_supply,
                            coin.total_supply
                          )}
                          displayType={"text"}
                          decimalScale={0}
                          suffix={"%"}
                        />
                        )
                      </small>
                    </span>
                  ) : (
                    <span></span>
                  )}
                </span>
              </span>
              <span>
                <span className="coinMarketItem__totalSupply-label">
                  {consts.HOME.TOTAL_SUPPLY}:
                </span>
                <span className="ml-1">
                  {coin.total_supply !== null ? (
                    <NumberFormat
                      value={coin.total_supply}
                      displayType={"text"}
                      thousandSeparator={true}
                      decimalScale={0}
                    />
                  ) : (
                    <span>{consts.HOME.NONE}</span>
                  )}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
