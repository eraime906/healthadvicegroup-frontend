import {useNavigate} from "react-router-dom";


export default function NavbarComponent() {
    const navigate = useNavigate();

    function onClick(destination) {
        navigate("/" + destination)
    }

    function format(display) {
        let char = display.charAt(0);
        return char.toUpperCase() + display.substring(1, display.length);
    }

    return (
        <div className={"h-16 w-full flex items-center "}>
            <img
                src={require("../assets/logo.png")}
                alt={"Health Advice Group Logo"}
                className={"h-12 w-12 m-4"}
                onClick={() => onClick("")}
            />
            <button className={"text-2xl text-blue-800 font-mono font-bold"} onClick={() => onClick("")}>
                Health Advice Group
            </button>
            <div className={"text-blue-800 flex justify-end"}>
            {[
                "education",
                "forecasting",
                "risks",
                "about",
                "login"
            ].map(page => <button className={"m-4 text-xl font-mono hover:text-bold hover:underline"} onClick={() => onClick(page)}>{format(page)}</button>)}
            </div>
        </div>
    )
}