import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useMarketCap, useMutateMarketData } from '../../hooks/useMarketCap';
import { ICoinGeckoInterfaces } from "../../models/coinGeckoInterfaces";
import { consts } from '../../consts/consts';
import { MarketCapItem } from "./MarketCapItem";
import { useEffect, useState } from "react";
import { MarketCapList } from "./MarketCapList";

export const Home = () => {

  const [selectOrderBy, setSelectOrderBy] = useState('market_cap_desc');

  const optionsOrderBy = [
    { label: 'Market cap ascending', value: 'market_cap_asc'},
    { label: 'Market cap descending', value: 'market_cap_desc'},
    { label: 'Rank ascending', value: 'id_asc'},
    { label: 'Rank descending', value: 'id_desc'},
    { label: 'Volume descending', value: 'volume_desc'}
  ];
  
  const handleChangeOrderBy = (event: SelectChangeEvent) => {
    setSelectOrderBy( event.target.value );
  };

  return (
    <div>
        <div className="container mb-2">
            <input 
                name="searchCoin" 
                type="search" 
                className="form-control" 
                placeholder={ consts.HOME.SEARCH } 
                autoComplete="false"
                // onChange={ handleOnChangeCoin }
            />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ selectOrderBy }
              label="Age"
              onChange={ handleChangeOrderBy }
            >
              {
                optionsOrderBy.map( option => (
                  <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>    
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="col-12 mt-4 mb-4">
            <MarketCapList selectOrderBy={ selectOrderBy } />
        </div>

    </div>
  )
}
