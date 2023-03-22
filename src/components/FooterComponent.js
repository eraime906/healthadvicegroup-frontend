import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import getIcon from "../utils/Icons";

/**
 * A component representing the site's footer that is placed at the bottom of each page
 *
 * @returns {JSX.Element}
 */
export default function FooterComponent() {
    let navigate = useNavigate();

    function format(display) {
        let char = display.charAt(0);
        return "» " + char.toUpperCase() + display.substring(1, display.length);
    }

    return (
        <div className={"flex flex-col w-full mt-10 bg-gradient-to-r from-slate-800 to-slate-900"}>
            <div>
                <p className={"flex text-neutral-400 mt-8 ml-12 mb-2 font-mono text-lg"}>© Health Advice Group</p>
            </div>
            <div className={"flex justify-center ml-12 mr-12 mb-8 grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1"}>
                {/* Site map */}
                <div>
                    <h1 className={"flex flex-col text-neutral-200 font-mono text-2xl"}>Site Map</h1>
                    {["education", "forecasting", "risks", "about", "login"].map(page => <button
                        className={"flex mt-1 text-l font-mono text-neutral-200 hover:font-bold"}
                        onClick={() => navigate("/" + page)}>
                        {format(page)}
                    </button>)}
                </div>

                {/* Social media links */}
                <div>
                    <h1 className={"flex flex-col text-neutral-200 font-mono text-2xl"}>Social Media</h1>
                    <SocialMediaLinkComponent
                        link={"instagram.com"}
                        name={"Instagram"} />
                    <SocialMediaLinkComponent
                        link={"facebook.com"}
                        name={"Facebook"} />
                    <SocialMediaLinkComponent
                        link={"pinterest.com"}
                        name={"Pinterest"} />
                </div>
                {/* Contact info */}
                <div>
                    <h1 className={"flex text-neutral-200 font-mono text-2xl"}>Contact Us</h1>
                    <ContactUsComponent icon={"phone"} contact={"07720 240147"}/>
                    <ContactUsComponent icon={"envelope"} contact={"support@hag.org"}/>
                    <ContactUsComponent icon={"location-dot"} contact={"1 St Katharine's Way,\n London,\n E1W 1UN QA"}/>
                </div>
                {/*  Our Promise  */}
                <div>
                    <h1 className={"flex text-neutral-200 font-mono text-2xl"}>Our Mission</h1>
                    <p className={"text-white font-mono text-md"}>Health Advice Group is a charity committed to providing accurate, useful and direct information regarding environmental health conditions, dealing with extreme temperatures and seasonal allergies.
                    </p>
                </div>
            </div>
        </div>
    )
}

/**
 * Component representing a social media link in the footer
 *
 * @param props name, link
 */
function SocialMediaLinkComponent(props) {
    return (
        <>
            <button
                className={"flex mt-1 text-l font-mono text-neutral-200 hover:font-bold"}
                onClick={() => {window.open("https://" + props.link, '_blank', 'noreferrer')}}>
                {"» " + props.name}
            </button>
        </>
    )
}

/**
 * Component representing a contact option in the footer
 *
 * @param props icon, contact
 */
function ContactUsComponent(props) {
    return (
        <div className={"flex items-center break-words mt-2"}>
            <FontAwesomeIcon icon={getIcon(props.icon)} inverse />
            <p className={"ml-2 text-white text-l font-mono hover:font-bold"}>{props.contact}</p>
        </div>
    )
}