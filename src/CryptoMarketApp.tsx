import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { MarketCapProvider } from "./context/marketCap/MarketCapProvider";
import { AppRouter } from "./routes/AppRouter";

import './styles/general.css';

export const CryptoMarketApp = () => {

  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: blue[50]
      }
    },
  });

  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider theme={ theme }>
        <MarketCapProvider>
          <AppRouter />
        </MarketCapProvider>
      </ThemeProvider>      
    </QueryClientProvider>
  )
}
