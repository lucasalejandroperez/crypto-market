
import { AppBar, Box,  Toolbar, Typography } from "@mui/material";
import { IPageRoute } from "../../models/IPageRoute";
import { CustomButtonLink } from "../CustomButtonLink/CustomButtonLink";
import { consts } from '../../consts/consts';
import pages from '../../mock/pages.json';
import { IconNavBar } from "./IconNavBar";
import { ChangeEvent } from "react";
import { SearchBar } from "../SearchBar/SearchBar";

export const NavBar = () => {

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconNavBar />
                <Typography 
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                { consts.GENERAL.TITLE.toUpperCase() }
                </Typography>
                
                <SearchBar />

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
