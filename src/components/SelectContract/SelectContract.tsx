import { Box, MenuItem, Select, Typography } from "@mui/material";
import { getArrayContracts } from "../../utilities/getArrayContracts";
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

interface IContractPlatformType {
    key: string;
    valor: unknown;
  }

export const SelectContract = ( { platforms }:any ) => {
  return (
      <span>
        <Select
            labelId="contracts"
            id="contracts"
            value={ 10 }
            label="More"
            sx={{
                height: 34
            }}
        >
            <MenuItem value={10}>More</MenuItem>
            {
                getArrayContracts(platforms).map( ( contract:IContractPlatformType ) => (
                    <MenuItem 
                        value={ 1 }
                        key={ contract.key }
                    >
                        <Typography 
                            component="span" 
                            mr={ 1 }
                            sx={{ 
                                fontWeight: 'bold'
                            }}
                        >
                            { contract.key }:
                        </Typography>
                        <Typography component="span" mr={ 1 }>
                            { `${ contract.valor }` }
                        </Typography>
                        <CopyToClipboard text={ `${ contract.valor }` } />
                    </MenuItem>
                ))
            }
        </Select>
      </span>
  )
}
