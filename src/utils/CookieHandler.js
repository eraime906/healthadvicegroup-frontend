import Cookies from "universal-cookie";

/**
 * @param cookie the cookie key
 *
 * @returns the value of the provided cookie
 */
export function getCookie(cookie) {
    const cookies = new Cookies();
    return cookies.get(cookie);
}

/**
 * @param cookie the cookie key
 *
 * @returns the value of the provided cookie as a boolean
 */
export function getCookieAsBoolean(cookie) {
    return getCookie(cookie) === 'true';
}

/**
 * Set the value for a provided cookie with default options
 *
 * @param name the name of the cookie
 * @param value the value of the cookie
 */
export function setCookie(name, value) {
    const cookies = new Cookies();
    cookies.set(name, value);
}

/**
 * Set the value for a provided cookie with custom options
 *
 * @param name the name of the cookie
 * @param value the value of the cookie
 * @param options the options
 */
export function setCookieWithData(name, value, options) {
    const cookies = new Cookies();
    cookies.set(name, value, options);
}

/**
 * Set a globally accessible cookie with default options
 *
 * @param name the name of the cookie
 * @param value the value of the cookie
 */
export function setGlobalCookie(name, value) {
    setCookieWithData(name, value, {path: '/'})
}

/**
 * @returns {boolean} whether the current user is logged in
 */
export function isLoggedIn() {
    return getCookieAsBoolean("logged-in")
}

/**
 * @returns {*} the username of the current logged in user
 */
export function getLoggedInUsername() {
    return getCookie("logged-user")
}