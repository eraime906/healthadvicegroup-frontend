import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap, faUmbrella, faTriangleExclamation, faSmog, faLocationDot, faUserNurse} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

/**
 * Used to store icons programatically
 *
 * This approach of icon storage is required by Babel if we want to store the which icon we want in the below component's props.
 * This is because the {@link FontAwesomeIcon} component constructor only accepts string literals or icon objects, so we store the equivalent
 * icon for the icon's name in an object here as we can't provide a string literal.
 *
 * @see #HomePageServiceComponent
 */
const icons = {
    'graduation-cap': faGraduationCap,
    'umbrella': faUmbrella,
    'triangle-exclamation': faTriangleExclamation,
    'smog': faSmog,
    'location-dot': faLocationDot,
    'user-nurse': faUserNurse
}

export default function HomePageServiceComponent(props) {
    const navigate = useNavigate();
    return (
        <div className={"flex flex-col items-center w-56 h-72 border-2 border-solid rounded-md border-black"}>
            <FontAwesomeIcon
                className={"w-12 h-12 m-2 mt-5"}
                icon={icons[props.icon]}
            />
            <p1 className={"font-bold text-2xl font-mono mb-3"}>{props.title}</p1>
            <text className={"font-sans text-center ml-2 mr-2"}>{props.text}</text>
            <button
                className={"mt-auto mb-4 text-blue-600 underline hover:font-bold"}
                onClick={() => {navigate("/" + props.destination)}}>
                Learn more</button>
        </div>
    )
}