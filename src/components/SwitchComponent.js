import {Switch} from "@headlessui/react";

/**
 * Component wrapping a switch functionality
 *
 * @param props
 *        description - text on the left of the toggle
 *        state - react state variable
 *        setState - react setState function
 * @returns {JSX.Element}
 */
export default function SwitchComponent(props) {
    return (
        <div className={"flex"}>
            <p1 className={"mr-2 font-mono"}>{props.description}</p1>
            <Switch
                checked={props.state}
                onChange={props.setState}
                className={`${props.state ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                <span className="sr-only"></span>
                <span className={`${props.state ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
            </Switch>
        </div>
    )
}