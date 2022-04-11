import axios, { AxiosResponse } from 'axios';
import { ICoinGeckoInterfaces } from '../models/coinGeckoInterfaces';
import { ICoin } from '../models/coinInterfaces';
import { ISearchCoinInterfaces } from '../models/searchCoinInterfaces';

axios.defaults.baseURL = process.env.REACT_APP_COINGECKO_BASE_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Set-Cookie": "HttpOnly;Secure;SameSite=Strict",
        },
      })
      .then(responseBody);
  },
};

const CoinGecko = {
    markets: ( orderBy:string ): Promise<ICoinGeckoInterfaces[]> => 
        requests.get(`/coins/markets?vs_currency=usd&order=${ orderBy }&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d`),
    searchCoins: ( description:string ): Promise<ISearchCoinInterfaces> => 
        requests.get(`/search?query=${ description }`), // TODO: IT returns not only coins, also categories, nft.. change that to return only coins in this case
    getCoin: ( id:string ): Promise<ICoin> => 
        requests.get(`/coins/${ id }?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
}

export const coinGeckoApi = axios.create();

export default {
    CoinGecko
}