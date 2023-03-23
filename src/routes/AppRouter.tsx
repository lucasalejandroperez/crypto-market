import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { About } from "../pages/About/About";
import { CoinDetail } from "../pages/CoinDetail/CoinDetail";
import { ConverterScreen } from "../pages/Converter/ConverterScreen";
import { HeatMap } from "../pages/HeatMap/HeatMap";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout/Layout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="converter" element={<ConverterScreen />} />
          <Route path="heatmap" element={<HeatMap />} />
          <Route path="about" element={<About />} />
          <Route path="coin/:coinId" element={<CoinDetail />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
