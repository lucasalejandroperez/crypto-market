import { TextField } from '@mui/material'
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { MarketCapContext } from '../../context/marketCap/MarketCapContext';
import { SearchResults } from './SearchResults';

import './SearchBar.css';

export const SearchBar = () => {

    const debouncedRef = useRef<NodeJS.Timeout>();

    const { setSearchDescription, searchDescription } = useContext( MarketCapContext );

    const [showSearch, setShowSearch] = useState( false );

    const handleOnChange = ( event: ChangeEvent<HTMLInputElement> ) => {

        const description = event.target.value;

        if (description.length < 2) {
            setShowSearch( false );
            return;
        }
        
        setShowSearch( true );
        
        if ( debouncedRef.current ) {
            clearTimeout( debouncedRef.current );
        }

        debouncedRef.current = setTimeout(() => {
            setSearchDescription( event.target.value );
        }, 1000 );

    }

    const handleOnBlur = () => {
        setTimeout(() => {
            setShowSearch( false );
        }, 500);
    }

    return (
        <>
            <div className="search-container">
                <TextField 
                    id="outlined-basic" 
                    label="Search a crypto coin..." 
                    color="primary" 
                    placeholder="Search a crypto coin..." 
                    variant="filled" 
                    onChange={ handleOnChange }
                    onBlur={ handleOnBlur }
                />
                {
                    showSearch && 
                    searchDescription.length > 2 && <SearchResults />
                }
            </div>
        </>
    )
}
