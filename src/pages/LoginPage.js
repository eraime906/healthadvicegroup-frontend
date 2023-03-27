import NavbarComponent from "../components/NavbarComponent";
import BannerComponent from "../components/BannerComponent";
import FooterComponent from "../components/FooterComponent";
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import getIcon from "../utils/Icons";
import Cookies from 'universal-cookie';
import {
    ACCOUNT_CREATION_ENDPOINT,
    CREDENTIALS_VALIDITY_ENDPOINT,
    head,
    post,
    USERNAME_VALIDITY_ENDPOINT
} from "../utils/HTTPRequestHandler";
import {setGlobalCookie} from "../utils/CookieHandler";

export default function LoginPage() {

    // React States
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [waitingFor, setWaitingFor] = useState("")

    /***
     * @returns whether {@link #email} is valid
     */
    function isEmailValid() {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    /**
     * @returns whether {@link #password} is considered 'strong'
     */
    function isPasswordStrong() {
        if (password.length < 8) {
            return false;
        }
        let hasUppercase = false;
        let hasSpecial = false;
        // iterate over password and check strength
        for (let i = 0; i < password.length; i++) {
            let character = password[i];
            if (character.toUpperCase() === character) {
                hasUppercase = true;
            }
            if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(character)) {
                hasSpecial = true;
            }
        }
        return hasUppercase && hasSpecial;
    }

    /**
     * @returns whether {@link #username} is taken or not
     */
    async function doesUsernameExist() {
        let exists;
        await head(USERNAME_VALIDITY_ENDPOINT + username, null,
            response => {
                exists = response.status === 204;
            },
            error => {
                exists = false;
            });
        return exists;
    }

    /**
     * Returns whether an account with the provided {@link #username} & {@link #email} exists,
     * and if so whether {@link #password} is correct for it.
     */
    async function checkLoginCredentials() {
        let valid;
        if (!await doesUsernameExist()) {
            setWaiting(false);
            setFeedback("No account with that username exists!");
            return false;
        }
        // Validate credentials
        await post(CREDENTIALS_VALIDITY_ENDPOINT, [
                {
                    username: username,
                    email: email,
                    password: password
                }
            ],
            response => {
                if (response.status === 204) {
                    setWaiting(false);
                    valid = true;
                }
            },
            error => {
                setWaiting(false);
                setFeedback(error.response.data)
                valid = false;
            });
        return valid;
    }

    async function onLoginClick() {
        setWaitingFor("Logging in...")
        setWaiting(true)
        if (await checkLoginCredentials()) {
            setGlobalCookie("logged-in", true);
            setGlobalCookie("logged-user", username);
            setFeedback("Logged in!")
        }
    }

    async function onSignupClick() {
        setWaitingFor("Signing Up...")
        setWaiting(true)
        // Is the provided email valid?
        if (!isEmailValid()) {
            setWaiting(false);
            setFeedback("Invalid email provided, please double check it!");
            return;
        }
        // Is the provided password 'strong'?
        if (!isPasswordStrong()) {
            setWaiting(false);
            setFeedback("Your password must have at least one special character, one uppercase character and be at least 8 characters long!")
            return;
        }
        // Does the provided username already exist?
        if (await doesUsernameExist()) {
            setWaiting(false);
            setFeedback("An account with that username already exists!");
            return;
        }
        await post(ACCOUNT_CREATION_ENDPOINT,
            [
                {
                    username: username,
                    email: email,
                    password: password
                }
            ],
            result => {
                if (result.status === 204) {
                    setWaiting(false);
                    setFeedback("Account created! Please login...")
                }
            },
            error => {
                setWaiting(false);
                setFeedback(error.response.data)
            })

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
                                   placeholder="TheLegend27" required/>
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
                                <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin"/>
                                {" " + waitingFor}
                            </div>
                        }
                    </div>
                    {feedback != null &&
                        <div className={"mt-4 ml-2 font-mono"}>
                            {feedback}
                        </div>
                    }
                </div>
                <div className={"w-7/12"}>
                    <h1 className={"mt-12 ml-24 w-full font-bold font-mono text-xl"}>Member Benefits</h1>
                    <ul className={"ml-24 list-disc font-mono mt-2"}>
                        <li>Access to exclusive, member-only content</li>
                        <li>Ability to save & favourite articles</li>
                        <li>Access to our unique personal health tracker</li>
                        <li>Ability to create customisable risk assessments</li>
                    </ul>
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}