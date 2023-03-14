/**
 * Represents a banner image shown at the top of each page
 * <p>
 * Used to standardize the height of banner images across all pages
 *
 * @param props alt - alt text of the image
 * @returns {JSX.Element}
 */
export default function bannerComponent(props) {
    return (
        <img
            className={"w-full"}
            src={require("../assets/" + props.src)}
            alt={props.alt}
        />
    )
}