import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent";

export default function AboutUsPage() {
    return (
        <>
            <NavbarComponent />
            <BannerComponent src={"about-us-banner.jpg"} alt={"Image of a man holding up a name-card with the writing about us on it"} />
            <div className={"ml-32 mr-32 mt-10 w-auto text-xl"}>
                <p>Health Advice Group is a charity committed to providing accurate, useful and direct information regarding environmental health conditions, dealing with extreme temperatures and seasonal allergies.</p>
                <p className={"mt-4"}>Founded in 2003, we have been relentlessly pursuing this cause ever since.</p>
                <p className={"mt-4"}>As of now we have available a collection of free articles and services welcome to anyone who wishes to take advantage of them.</p>
            </div>
            <FooterComponent />
        </>
    )
}