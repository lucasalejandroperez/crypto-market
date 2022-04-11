import { createTheme, ThemeProvider } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
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
        light: '#ffffff',
        dark: '#007bff',
        contrastText:  '#ffffff'
      },
      secondary: {
        main: grey[50]
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
