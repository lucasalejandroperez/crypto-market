import { createTheme, ThemeProvider } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouter } from "./routes/AppRouter";
import './styles/general.css';

export const CryptoMarketApp = () => {

  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
    },
  });

  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider theme={ theme }>
        <AppRouter />
      </ThemeProvider>      
    </QueryClientProvider>
  )
}
