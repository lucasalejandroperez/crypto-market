import { TextField } from '@mui/material'
import { ChangeEvent, useContext, useRef } from 'react';
import { MarketCapContext } from '../../context/marketCap/MarketCapContext';
import { SearchResults } from './SearchResults';

import './SearchBar.css';

export const SearchBar = () => {

    const debouncedRef = useRef<NodeJS.Timeout>();

    const { setSearchDescription, searchDescription } = useContext( MarketCapContext );

    const handleOnChange = ( event: ChangeEvent<HTMLInputElement> ) => {

        const description = event.target.value;

        // TODO: Only do it if press 3 characters or more
        if (description.length < 3) {
            return;
        }
        
        if ( debouncedRef.current ) {
            clearTimeout( debouncedRef.current );
        }

        debouncedRef.current = setTimeout(() => {

        setSearchDescription( event.target.value );
        
      }, 1000 );

    }

    return (
        <div className="search-container">
            <TextField 
                id="outlined-basic" 
                label="Search a crypto coin..." 
                color="secondary" 
                placeholder="Search a crypto coin..." 
                variant="outlined" 
                onChange={ handleOnChange }
            />

            {
                searchDescription.length > 2 && <SearchResults />
            }
        </div>
    )
}
