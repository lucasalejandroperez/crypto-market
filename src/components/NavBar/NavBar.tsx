import { useState } from "react";
import { AppBar, Box, IconButton, Menu, Toolbar, Typography, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { IPageRoute } from "../../models/IPageRoute";
import { CustomButtonLink } from "../CustomButtonLink/CustomButtonLink";
import { consts } from '../../consts/consts';

const pages: IPageRoute[] = [
    {
      id: 1,
      name: 'Market cap',
      path: '/'
    },
    {
      id: 2,
      name: 'Converter',
      path: '/converter'
    },
    {
      id: 3,
      name: 'About',
      path: '/about'
    }
  ];

export const NavBar = () => {

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
        <AppBar position="static" color="primary">
            <Toolbar>
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
                <Typography 
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                { consts.GENERAL.Title.toUpperCase() }
                </Typography>

                <Box
                sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                    {
                        pages.map( ( { id, name, path }: IPageRoute ) => (
                            <CustomButtonLink 
                                key={ id }
                                to={ path }
                            >
                                    { name }
                            </CustomButtonLink>
                        ))
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}
