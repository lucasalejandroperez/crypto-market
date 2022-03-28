import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Menu, Typography, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import pages from '../../mock/pages.json';
import { IPageRoute } from "../../models/IPageRoute";

export const IconNavBar = () => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>( null );
    const navigate = useNavigate();

    const handleOpenNavMenu = ( event: React.MouseEvent<HTMLElement> ) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = ( pathTo: string) => {
        setAnchorElNav(null);
        
        if ( pathTo && typeof pathTo !== 'object' ) {
        navigate(pathTo.toLowerCase() );
        }
    };

    return (
        <Box sx={{ display: { sm: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={ handleOpenNavMenu }
                color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={ anchorElNav }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={ Boolean(anchorElNav) }
                onClose={ handleCloseNavMenu }
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
            {
                pages.map(( { id, name, path }: IPageRoute ) => (
                <MenuItem key={ id } onClick={ () => handleCloseNavMenu( path ) }>
                    <Typography textAlign="center">{ name }</Typography>
                </MenuItem>
                ))
            }
            </Menu>
        </Box>
    )
}
