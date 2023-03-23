import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { Coin } from "../../models/searchCoinInterfaces";

interface Props {
  label: string;
  value: string;
  showResults: boolean;
  searchItems: Coin[] | undefined;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (coin: Coin) => void;
}

export const SearchCoin = ({
  label,
  value,
  showResults,
  searchItems,
  onBlur,
  onChange,
  onClick,
}: Props) => {
  return (
    <>
      <TextField
        autoComplete="off"
        id="left-coin"
        label={label}
        color="primary"
        placeholder={label}
        onChange={onChange}
        sx={{
          width: "100%",
        }}
        onBlur={onBlur}
        value={value}
      />
      {showResults && (
        <div className="converter-results">
          <ul className="list-group converter-items mt-3">
            {searchItems &&
              searchItems.map((coin) => (
                <li
                  key={coin.id}
                  className={`list-group-item list-group-item-action pointer`}
                  onClick={() => onClick(coin)}
                >
                  <span onClick={() => onClick(coin)}>{coin.name}</span>
                  {coin.market_cap_rank && (
                    <span className="ml-1">
                      <small>({coin.market_cap_rank})</small>
                    </span>
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    <span className="mr-1">
                      <img src={coin.thumb} alt="coin logo" />
                    </span>
                    <span>{coin.symbol}</span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
