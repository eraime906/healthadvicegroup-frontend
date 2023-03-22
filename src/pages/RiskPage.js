import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent";

export default function RiskPage() {
    return (
        <>
            <NavbarComponent />
            <BannerComponent src={"risks-banner.jpg"} alt={"Image of a street name called time for change"}/>
            <FooterComponent />
        </>
    )
}