import {useNavigate} from "react-router-dom";
import {useState} from "react";

/**
 * A component representing the navigation bar placed at the top of each page
 * <p>
 * Responsive to different screen sizes, switching from hyperlinks to a burger menu when required
 *
 * @returns {JSX.Element}
 */
export default function NavbarComponent() {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    function onClick(destination) {
        navigate("/" + destination)
    }

    function format(display) {
        let char = display.charAt(0);
        return char.toUpperCase() + display.substring(1, display.length);
    }

    return (
        <div className={"h-16 w-full flex items-center justify-content"}>
            <div className={"flex w-96"}>
                <img
                    src={require("../assets/logo.png")}
                    alt={"Health Advice Group Logo"}
                    className={"h-12 w-12 m-4"}
                    onClick={() => onClick("")}
                />
                <button className={"md:text-l lg:text-2xl text-blue-800 font-mono font-bold"}
                        onClick={() => onClick("")}>
                    Health Advice Group
                </button>
            </div>
            {/*Drop-down for small screens*/}
            <div className={"visible xl:hidden w-9/12 flex justify-end pr-8"}>
                <img className={"w-12 h-12"} src={require("../assets/navbar-burger-icon.png")}
                     alt={"Drop down menu containing links to other pages of the website"} onClick={() => {
                        setExpanded(true) // from here elliot!
                }
                }/>
            </div>
            {/* Desktop view*/}
            <div className={"hidden xl:visible xl:w-9/12 xl:flex justify-end mr-12 text-blue-800"}>
                {[
                    "education",
                    "forecasting",
                    "risks",
                    "about",
                    "login"
                ].map(page => <button
                    className={"m-4 text-xl font-mono hover:text-bold hover:underline"}
                    onClick={() => onClick(page)}>
                    {format(page)}
                </button>)}
            </div>
        </div>
    )
}