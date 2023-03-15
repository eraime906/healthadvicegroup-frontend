import NavbarComponent from "../components/NavbarComponent";
import BannerComponent from "../components/BannerComponent";
import FooterComponent from "../components/FooterComponent";
import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import getIcon from "../utils/Icons";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [waitingFor, setWaitingFor] = useState("")

    function onLoginClick() {
        setWaitingFor("Logging in...")
        setWaiting(true)
    }

    function onSignupClick() {
        setWaitingFor("Signing Up...")
        setWaiting(true)

    }

    return (
        <>
            <NavbarComponent/>
            <BannerComponent src={"login-banner.jpg"} alt={"Picture of a forest track in the morning"}/>
            {/* Login screen main section */}
            <div className={"pt-8 pl-24 pr-24 w-full flex gap-8"}>
                <div className={"w-5/12"}>
                    <form className={"grid gap-4"}>
                        {/* Username input */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Username
                            </label>
                            <input type="text"
                                   id="username"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   onChange={(event) => setUsername(event.target.value)}
                                   placeholder="JohnSmith26" required/>
                        </div>
                        {/* Email input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input type="text"
                                   id="email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   onChange={(event) => setEmail(event.target.value)}
                                   placeholder="example@email.com" required/>
                        </div>
                        {/* Password input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input type="password"
                                   id="password"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   onChange={(event) => setPassword(event.target.value)}
                                   placeholder="•••••••••" required
                            />
                        </div>
                    </form>
                    {/* Login & Register */}
                    <div className={"flex items-center"}>
                        <button
                            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={() => onLoginClick()}>
                            Login
                        </button>
                        <button
                            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={() => onSignupClick()}>
                            Sign Up
                        </button>
                        {/* Conditionally render a loading icon with text if we're waiting for a response from the backend */}
                        {waiting &&
                            <div className={"mt-4 ml-2"}>
                                <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin" />
                                {" " + waitingFor}
                            </div>
                        }
                    </div>
                </div>
                <div className={"w-7/12 bg-emerald-900"}>
                    2
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}