import React from 'react';
import { Check } from "@mui/icons-material";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import { useState } from "react";
import { consts } from "../../consts/consts";
import copyToClipboard from "../../utilities/copyToClipboard";

import './copytoClipboard.css';

interface ICopyToCipboard {
    text: string;
}

export const CopyToClipboard = ( { text }:ICopyToCipboard ) => {

    // TODO: Move to a custom hook?
    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        copyToClipboard( text );

        setOpen(true);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={ handleClose }
          >
            <Check fontSize="small" />
          </IconButton>
        </React.Fragment>
    );
    
    return (
        <>
            <Tooltip title={ consts.COMPONENTS.COPY_TO_CLIPBOARD }>
                <span
                    className="clipboard-icon"
                    onClick={ handleOnClick }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px" viewBox="0 0 24 24" className="copy-to-clipboard-contract"><path d="M5.7 14.7H4.8C4.32261 14.7 3.86477 14.5104 3.52721 14.1728C3.18964 13.8352 3 13.3774 3 12.9V4.8C3 4.32261 3.18964 3.86477 3.52721 3.52721C3.86477 3.18964 4.32261 3 4.8 3H12.9C13.3774 3 13.8352 3.18964 14.1728 3.52721C14.5104 3.86477 14.7 4.32261 14.7 4.8V5.7M11.1 9.3H19.2C20.1941 9.3 21 10.1059 21 11.1V19.2C21 20.1941 20.1941 21 19.2 21H11.1C10.1059 21 9.3 20.1941 9.3 19.2V11.1C9.3 10.1059 10.1059 9.3 11.1 9.3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </span>
            </Tooltip>
            <Snackbar
                open={ open }
                autoHideDuration={ 3000 }
                onClose={ handleClose }
                message={ consts.COMPONENTS.COPY_TO_CLIPBOARD_SUCCESSFULL }
                action={ action }
            />
        </>
    )
}
