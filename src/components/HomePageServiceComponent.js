import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import getIcon from "../utils/Icons";

export default function HomePageServiceComponent(props) {
    const navigate = useNavigate();
    return (
        <div className={"flex flex-col items-center w-56 h-72 border-2 border-solid rounded-md border-black"}>
            <FontAwesomeIcon
                className={"w-12 h-12 m-2 mt-5"}
                icon={getIcon(props.icon)}
            />
            <h1 className={"font-bold text-2xl font-mono mb-3"}>{props.title}</h1>
            <p className={"font-sans text-center ml-2 mr-2"}>{props.text}</p>
            <button
                className={"mt-auto mb-4 text-blue-600 underline hover:font-bold"}
                onClick={() => {navigate("/" + props.destination)}}>
                Learn more
            </button>
        </div>
    )
}