import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

// See HomePageServiceComponent for an explanation of this object
const icons = {

}

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
        <div className={"flex flex-col w-full h-[300px] mt-10 bg-footer"}>
            <div>
                <text className={"flex text-neutral-400 mt-8 ml-12 mb-2 font-mono text-lg"}>© Health Advice Group</text>
            </div>
            <div className={"flex ml-16 gap-10"}>
                <div>
                    <p1 className={"flex flex-col text-neutral-200 font-mono text-2xl"}>Site Map</p1>
                    {["education", "forecasting", "risks", "about", "login"].map(page => <button
                        className={"flex mt-1 text-l font-mono text-neutral-200 hover:font-bold"}
                        onClick={() => navigate("/" + page)}>
                        {format(page)}
                    </button>)}
                </div>
                <div>
                    <p1 className={"flex flex-col text-neutral-200 font-mono text-2xl"}>Social Media</p1>
                </div>
            </div>
        </div>
    )
}
