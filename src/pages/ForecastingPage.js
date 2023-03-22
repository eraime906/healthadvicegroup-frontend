import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent"

export default function ForecastingPage() {
    return (
        <>
            <NavbarComponent />
            <BannerComponent src={"forecasting-banner.jpg"} alt={"Image of a stormy sky"}/>
            <FooterComponent />
        </>
    )
}