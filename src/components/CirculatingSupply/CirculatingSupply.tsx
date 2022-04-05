import React, { useState } from "react";
import { Box, Popover, Typography } from "@mui/material";
import LinearWithValueLabel from "../LinearProgressWithLabel/LinearWithValueLabel";
import { getPercentageCirculatingSupply } from "../../utilities/contractUtils";
import { consts } from "../../consts/consts";

interface ICirculatingSupply {
    circulating_supply:number;
    max_supply:number | null;
    symbol: string | undefined;
}

export const CirculatingSupply = ( { circulating_supply, max_supply, symbol }:ICirculatingSupply ) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {

        if (max_supply) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Typography
                aria-owns={ open ? 'mouse-over-popover' : undefined }
                aria-haspopup="true"
                onMouseEnter={ handlePopoverOpen }
                onMouseLeave={ handlePopoverClose }
            >
                { circulating_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) } { symbol && symbol.toUpperCase() }
            </Typography>
            {
                circulating_supply && max_supply &&
                    <Box 
                        sx={{
                            width: '90%'
                        }}
                        aria-owns={ open ? 'mouse-over-popover' : undefined }
                        aria-haspopup="true"
                        onMouseEnter={ handlePopoverOpen }
                        onMouseLeave={ handlePopoverClose }
                    >
                        <LinearWithValueLabel value={ getPercentageCirculatingSupply(circulating_supply, max_supply) } />
                    </Box>
            }
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={ open}
                anchorEl={ anchorEl }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={ handlePopoverClose }
                disableRestoreFocus
            >
                <Box 
                    sx={{ 
                        p: 1,
                        minWidth: '300px'
                    }}
                >
                    {
                        circulating_supply && max_supply &&
                            <Box 
                                sx={{
                                    width: '90%'
                                }}
                            >
                                <LinearWithValueLabel 
                                    value={ getPercentageCirculatingSupply(circulating_supply, max_supply) } 
                                />
                            </Box>
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            widht: '100%'
                        }}
                    >
                        <Typography
                            component="span"
                            variant="button"
                            mr={ 3 }
                        >
                            { consts.MARKET_CAP_LIST.CIRCULATING_SUPPLY }:
                        </Typography>
                        <Typography
                            component="span"
                            variant="caption"
                        >
                            { circulating_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            widht: '100%'
                        }}
                    >
                        <Typography
                            component="span"
                            variant="button"
                            mr={ 3 }
                        >
                            { consts.MARKET_CAP_LIST.MAX_SUPPLY }:
                        </Typography>
                        {
                            max_supply &&
                                <Typography
                                    component="span"
                                    variant="caption"
                                >
                                    { max_supply.toLocaleString(undefined, { maximumFractionDigits:2 }) }
                                </Typography>
                        }
                    </Box>
                </Box>
            </Popover>
        </React.Fragment>
    )
}
