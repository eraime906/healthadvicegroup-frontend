import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent";

export default function AboutUsPage() {
    return (
        <>
            <NavbarComponent />
            <BannerComponent src={"about-us-banner.jpg"} alt={"Image of a man holding up a name-card with the writing about us on it"} />
            <FooterComponent />
        </>
    )
}