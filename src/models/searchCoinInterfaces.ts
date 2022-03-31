export interface ISearchCoinInterfaces {
    coins:      Coin[];
    exchanges:  any[];
    icos:       any[];
    categories: Category[];
    nfts:       Nft[];
}

export interface Category {
    id:   number;
    name: string;
}

export interface Coin {
    id:              string;
    name:            string;
    symbol:          string;
    market_cap_rank: number | null;
    thumb:           string;
    large:           string;
}

export interface Nft {
    id:     null | string;
    name:   string;
    symbol: string;
    thumb:  string;
}
