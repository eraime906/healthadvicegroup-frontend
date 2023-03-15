import {faGraduationCap, faUmbrella, faTriangleExclamation, faSmog, faLocationDot, faUserNurse, faPhone, faEnvelope, faSpinner} from "@fortawesome/free-solid-svg-icons";

/**
 * Used to store icons programatically so that they can be referenced in component properties
 */
const icons = {
    'graduation-cap': faGraduationCap,
    'umbrella': faUmbrella,
    'triangle-exclamation': faTriangleExclamation,
    'smog': faSmog,
    'location-dot': faLocationDot,
    'user-nurse': faUserNurse,
    'phone': faPhone,
    'envelope': faEnvelope,
    'loader': faSpinner
}

/**
 * Return the icon with the provided {@param name}
 *
 * @param name the name of the icon to fetch
 * @returns {*} the icon with the provided name
 */
export default function getIcon(name) {
    return icons[name];
}