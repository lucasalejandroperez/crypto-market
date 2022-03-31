import { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { consts } from '../../consts/consts';
import { MarketCapList } from "./MarketCapList";
import { MarketCapContext } from "../../context/marketCap/MarketCapContext";

export const Home = () => {

  const { orderBy, setOrderBy } = useContext(MarketCapContext);

  const optionsOrderBy = [
    { label: 'Market cap ascending', value: 'market_cap_asc'},
    { label: 'Market cap descending', value: 'market_cap_desc'},
    { label: 'Rank ascending', value: 'id_asc'},
    { label: 'Rank descending', value: 'id_desc'},
    { label: 'Volume descending', value: 'volume_desc'}
  ];
  
  const handleChangeOrderBy = (event: SelectChangeEvent) => {
    setOrderBy( event.target.value );
  };

  return (
    <div>
        <div className="mt-3">
          <div className="d-flex justify-content-center">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Order</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ orderBy }
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
        </div>
        <div className="col-12 mt-4 mb-4">
            <MarketCapList />
        </div>
    </div>
  )
}
