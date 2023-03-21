import NavbarComponent from "../components/NavbarComponent";
import BannerComponent from "../components/BannerComponent"
import HomePageServiceComponent from "../components/HomePageServiceComponent";
import FooterComponent from "../components/FooterComponent";
import {CookieConsent} from "react-cookie-consent";

export default function HomePage() {
    return (
        <div>
            <CookieConsent
                location="bottom"
                buttonText="I Accept"
                cookieName="cookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                Health Advice Group uses cookies to enhance user experience.{" "}
                <span style={{ fontSize: "10px" }}>No personal data will be collected or redistributed.</span>
            </CookieConsent>
            <NavbarComponent />
            <BannerComponent src={"home-banner.jpg"} alt={"Picture of a forest floor"}/>
            {/* Our Services Title*/}
            <h1 className={"w-full font-mono font-bold flex items-center justify-center mt-5 mb-5 text-4xl"}>Our Services</h1>
            {/* Services List */}
            <div className={"w-full flex items-center justify-center"}>
                {/* This grid will resize as required by the screen size, between 1 to 6 columns */}
                <div className={"grid gap-5 grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6"}>
                    <HomePageServiceComponent
                        icon="graduation-cap"
                        title={"Education"}
                        text={"Learn about environmental conditions, allergies, home risk assessments and how to deal with extreme temperatures"}
                        destination={"education"}/>
                    <HomePageServiceComponent
                        icon="umbrella"
                        title={"Forecasting"}
                        text={"Stay informed with the most recent weather forecasts and weather warnings from trusted providers"}
                        destination={"forecasting"}
                    />
                    <HomePageServiceComponent
                        icon="triangle-exclamation"
                        title={"Risk Assessments"}
                        text={"Use our extensive Risk Assessment tools to ensure your home is a safe and healthy environment"}
                        destination={"Risks"}
                    />
                    <HomePageServiceComponent
                        icon="smog"
                        title={"Air Quality"}
                        text={"Learn about areas suffering from poor air quality or pollen count with our customisable dashboard"}
                        destination={"forecasting"}
                    />
                    <HomePageServiceComponent
                        icon="location-dot"
                        title={"Location Service"}
                        text={"Keep information relevant by selecting statistics for your current location only"}
                        destination={"forecasting"}
                    />
                    <HomePageServiceComponent
                        icon="user-nurse"
                        title={"Fitness Tracker"}
                        text={"Stay on top of your journey to a healthier life using our personalisable Fitness Tracker"}
                        destination={"login"}
                    />
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}