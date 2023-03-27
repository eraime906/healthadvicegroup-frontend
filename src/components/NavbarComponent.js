import {useNavigate} from "react-router-dom";
import {Fragment, useState} from "react";
import Cookies from 'universal-cookie';
import {getLoggedInUsername, isLoggedIn, setCookieWithData, setGlobalCookie} from '../utils/CookieHandler'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import getIcon from "../utils/Icons";
import {Menu, Transition} from "@headlessui/react";

function logout() {
    setGlobalCookie("logged-in", false);
    setGlobalCookie("logged-user", null);
}

/**
 * A component representing the navigation bar placed at the top of each page
 * <p>
 * Responsive to different screen sizes, switching from hyperlinks to a burger menu when required
 *
 * @returns {JSX.Element}
 */
export default function NavbarComponent() {

    // React States
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function onClick(destination) {
        navigate("/" + destination)
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
                {!expanded && <FontAwesomeIcon
                    className={"w-10 h-10"}
                    icon={getIcon("bars")}
                    onClick={() => setExpanded(true)}
                />}
                {expanded && <DropdownComponent/>}
            </div>
            {/* Desktop view*/}
            <div className={"hidden xl:visible xl:w-9/12 xl:flex justify-end mr-12 text-blue-800"}>
                <ul className={"flex m-4 gap-8 text-xl font-mono"}>
                    <button className={"hover:text-bold hover:underline"} onClick={() => {navigate("/education")}}>Education</button>
                    <button className={"hover:text-bold hover:underline"} onClick={() => {navigate("/forecasting")}}>Forecast</button>
                    <button className={"hover:text-bold hover:underline"} onClick={() => {navigate("/risks")}}>Risks</button>
                    <button className={"hover:text-bold hover:underline"} onClick={() => {navigate("/about")}}>About Us</button>
                    {!isLoggedIn() && <button className={"hover:text-bold hover:underline"} onClick={() => {navigate("/login")}}>Login</button>}
                    {isLoggedIn() && <button className={"hover:text-bold hover:underline"} onClick={() => {
                        logout()
                        setReload(!reload)
                    }}>Logout</button>}
                </ul>
            </div>
        </div>
    )
}

function DropdownComponent() {

    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium">
                    <FontAwesomeIcon className={"w-10 h-10"} icon={getIcon("bars")}/>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="gap-1 flex flex-col justify-start absolute right-0 w-56 mt-2 p-4 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <DropdownButton
                        text={"Education"}
                        icon={"graduation-cap"}
                        onClick={() => navigate("/education")}
                    />
                    <DropdownButton
                        text={"Forecast"}
                        icon={"umbrella"}
                        onClick={() => navigate("/forecasting")}
                    />
                    <DropdownButton
                        text={"Risks"}
                        icon={"triangle-exclamation"}
                        onClick={() => navigate("/risks")}
                    />
                    <DropdownButton
                        text={"About Us"}
                        icon={"smog"}
                        onClick={() => navigate("/about")}
                    />
                    {!isLoggedIn() && <DropdownButton
                        text={"Login"}
                        icon={"user"}
                        onClick={() => navigate("/login")}
                    />}
                    {isLoggedIn() && <DropdownButton
                        text={"Logout"}
                        icon={"user"}
                        onClick={() => {
                            logout()
                            setReload(!reload)
                        }}
                    />}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function DropdownButton(props) {
    return (
        <div
            className={"items-center"}
            onClick={props.onClick}
        >
            <FontAwesomeIcon className={"w-4 h-4 ml-2 mr-2 mt-2"} icon={getIcon(props.icon)}/>
            <button className={"text-left hover:text-bold hover:underline"}>
                {props.text}
            </button>
        </div>
    )
}

