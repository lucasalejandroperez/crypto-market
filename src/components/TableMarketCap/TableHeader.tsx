import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { consts } from "../../consts/consts";

export const TableHeader = () => {
  return (
    <Box
      component={Grid}
      item
      xs={12}
      sx={{
        borderTop: "1px solid #eff2f5",
        paddingTop: 1.5,
        paddingBottom: 1.5,
      }}
    >
      <Grid container>
        <Box
          component={Grid}
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: 500,
            }}
          >
            #
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={5}
          sm={5}
          md={3}
          lg={2}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            {consts.MARKET_CAP_LIST.NAME}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={4}
          sm={3}
          md={2}
          lg={2}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            {consts.MARKET_CAP_LIST.PRICE}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={2}
          sm={2}
          md={1}
          lg={1}
          display={{ xs: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            24h %
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          sm={1}
          md={1}
          lg={1}
          display={{ xs: "none", sm: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            7d %
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          md={2}
          lg={2}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            {consts.MARKET_CAP_LIST.MARKET_CAP}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          md={2}
          lg={2}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            {consts.MARKET_CAP_LIST.CIRCULATING_SUPPLY}
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          lg={1}
          display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            {consts.MARKET_CAP_LIST.ATH}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};
