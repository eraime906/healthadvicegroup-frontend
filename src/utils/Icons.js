import {
    faGraduationCap,
    faUmbrella,
    faTriangleExclamation,
    faSmog,
    faLocationDot,
    faUserNurse,
    faPhone,
    faEnvelope,
    faSpinner,
    faHeart,
    faTag,
} from "@fortawesome/free-solid-svg-icons";
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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
    'loader': faSpinner,
    'heart-solid': faHeart,
    'heart-empty': regular("heart"),
    "tag": faTag
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