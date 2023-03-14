import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutUsPage from "./pages/AboutUsPage";
import RiskPage from "./pages/RiskPage";
import ForecastingPage from "./pages/ForecastingPage";
import EducationPage from "./pages/EducationPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/education" element={<EducationPage/>} />
            <Route path="/forecasting" element={<ForecastingPage/>} />
            <Route path="/risks" element={<RiskPage/>} />
            <Route path="/about" element={<AboutUsPage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
