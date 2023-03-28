import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import BannerComponent from "../components/BannerComponent"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import getIcon from "../utils/Icons";
import React, {useState} from "react";
import {CUSTOM_LOCATION, get, LOCATION_DATA_ENDPOINT, LOCATIONS_ENDPOINT} from "../utils/HTTPRequestHandler";
import {Dialog} from "@headlessui/react";

const locations = [];

export default function ForecastingPage() {

    const [loaded, setLoaded] = useState(false);
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    if (!loaded) {
        get(LOCATIONS_ENDPOINT, {},
            response => {
                String(response.data).split(",").forEach(location => {
                    get(LOCATION_DATA_ENDPOINT + location, {},
                        response => {
                            let weatherLocation = new WeatherLocation(response.data);
                            let found = false;
                            locations.forEach(loadedLocation => {
                                if (weatherLocation.get("name") === loadedLocation.get("name")) {
                                    found = true;
                                }
                            })
                            if (!found) {
                                locations.push(weatherLocation)
                            }
                            setLoaded(true);
                        },
                        error => {
                            console.log(error)
                        })
                })
            },
            error => {
                console.log(error)
            })
    }

    function useUserLocation() {
        if (fetchingLocation) {
            return;
        }
        setFetchingLocation(true)
        navigator.geolocation.getCurrentPosition(function (position) {
            get(CUSTOM_LOCATION + position.coords.latitude + "/" + position.coords.longitude, {},
                response => {
                    setCurrentLocation(new WeatherLocation(response.data))
                    setFetchingLocation(false)
                },
                error => console.log(error))
        });
    }

    return (
        <>
            <NavbarComponent/>
            <BannerComponent src={"forecasting-banner.jpg"} alt={"Image of a stormy sky"}/>
            {/* Articles Title */}
            <div
                className={"flex flex-col w-full font-mono font-bold flex items-center justify-center mt-5 mb-2 text-4xl"}>
                <h1>Forecasting</h1>
                <h1 className={"text-sm italic mt-2"}>Click any location to learn more!</h1>
            </div>
            {/* User location button */}
            <div className={"flex justify-center mt-4 w-full"}>
                {currentLocation == null &&
                    <div>
                        <button
                            className="w-auto mt-auto outline-none border-none mt-6 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2"
                            onClick={useUserLocation}>
                            <>
                                <FontAwesomeIcon className={"mr-2"} icon={getIcon("location-dot")}/>
                                Use My Location
                            </>
                        </button>
                        {fetchingLocation &&
                            <div className={"flex w-full justify-center items-center"}>
                                <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin"/>
                                <h1>Fetching Location...</h1>
                            </div>
                        }
                    </div>}
                {currentLocation != null &&
                    <div className={"flex-col flex items-center"}>
                        <button
                            className="w-auto mt-auto outline-none border-none mt-6 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2"
                            onClick={useUserLocation}>
                            <>
                                <FontAwesomeIcon className={"mr-2"} icon={getIcon("location-dot")}/>
                                Refresh My Location
                            </>
                        </button>
                        {fetchingLocation &&
                            <div className={"flex w-full justify-center items-center "}>
                                <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin"/>
                                <h1>Fetching Location...</h1>
                            </div>
                        }
                        {!fetchingLocation && <WeatherLocationComponent location={currentLocation}/>}
                    </div>
                }
            </div>
            {/* Locations div */}
            <div className={"pt-8 pl-8 pr-8 sm:pl-24 sm:pr-24 w-full flex gap-8 flex-col"}>
                {/* Locations display */}
                {currentLocation != null &&
                    <h1 className={"w-full text-center font-bold font-mono text-2xl"}>Default Locations</h1>}
                <div className={"w-full"}>
                    {!loaded &&
                        <div className={"flex w-full items-center gap-2"}>
                            <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin"/>
                            <h1>Loading Articles...</h1>
                        </div>
                    }
                    {/* If the articles have loaded then display the articles */}
                    {loaded &&
                        <div
                            className={"overflow-y-auto overflow-x-hidden h-96 grid gap-5 grid-rows-100 grid-cols-1 md:grid-cols-2"}>
                            {locations.map(location =>
                                <WeatherLocationComponent location={location}/>
                            )}
                        </div>
                    }
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}

class WeatherLocation {

    data

    constructor(data) {
        this.data = data;
    }

    get(key) {
        return this.data[key];
    }

    getTemperature() {
        return this.get("real-temp");
    }

    getWindSpeed() {
        return this.get("wind-speed");
    }

    getTemperatureStatus() {
        return 0 >= Number(this.getTemperature()) ? "Colder than usual" : "Typical Temperature"
    }

    getWeatherStatus() {
        let status = ""
        if (Number(this.get("pressure")) > 1050) {
            status += "High Pressure, ";
        } else if (950 >= Number(this.get("pressure"))) {
            status += "Low Pressure, ";
        }
        if (Number(this.getWindSpeed()) > 25) {
            status += "High Wind Speed, "
        }
        return status.length === 0 ? "Typical Weather" : status.substring(0, status.length - 1)
    }

    getPollenStatus() {
        return "Typical Pollen Count"
    }

    getDescription() {
        let desc = this.get("weather-desc")
        let char = desc.charAt(0).toUpperCase();
        return char + desc.substring(1, desc.length);
    }

    getCloudAmount() {
        return this.get("cloud-rating");
    }

    getFeelsLikeTemp() {
        return this.get("feels-like-temp");
    }

    getHumidity() {
        return this.get("humidity");
    }

    getWindBearing() {
        return this.get("wind-bearing");
    }

}

/**
 * Represents an article on the webpage
 *
 * @param props article - the article class object
 * @returns {JSX.Element}
 */
function WeatherLocationComponent(props) {

    const [open, setOpen] = useState(false);

    let location = props.location;
    let name = location.get("name");
    name = name === "custom" ? "Your Location" : name;

    return (
        <div>
            <div
                className={"w-full flex bg-slate-200 h-48 rounded-lg border-2 border-black relative hover:bg-slate-300"}
                data-modal-target={`${name}-modal`}
                data-modal-toggle={`${name}-modal`}
                onClick={() => {
                    setOpen(true)
                }}>
                <div className={"flex flex-col w-full h-48"}>
                    <div className={"w-full flex flex-col md:flex-row text-center"}>
                        <h1 className={"text-xl font-mono font-bold"}>{name}</h1>
                        <h1 className={"truncate whitespace-pre-wrap"}>{" - " + location.getDescription()}</h1>
                    </div>
                    <h1 className={"ml-2 mb-1 truncate"}>{location.getTemperatureStatus()}</h1>
                    <h1 className={"ml-2 mb-1 truncate"}>{location.getWeatherStatus()}</h1>
                    <h1 className={"ml-2 mb-1 truncate"}>{location.getPollenStatus()}</h1>
                    <div className={"text-blue-500 text-sm mt-auto ml-2 mb-1"}>
                        Click to view stats
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={() => null}>
                <div className={"fixed inset-0 flex items-center justify-center p-4"}>
                    <Dialog.Panel
                        className={"flex flex-col w-full max-w-sm rounded bg-white border-2 border-black w-96 h-96 align-middle"}>
                        <Dialog.Title
                            className={"text-xl font-mono font-bold m-2"}>{name + " - " + location.getDescription()}</Dialog.Title>
                        <h1 className={"text-center font-bold text-xl mt-2"}>Statistics</h1>
                        {/* Location Statistics */}
                        <div className={"ml-2 mb-1 truncate"}>
                            <h1>{location.getTemperatureStatus()}</h1>
                            <h1>{location.getWeatherStatus()}</h1>
                            <h1>{location.getPollenStatus()}</h1>
                            <h1>{"Temperature: " + Math.round(Number((location.getTemperature()))) + "c"}</h1>
                            <h1>{"Feels Like: " + Math.round(Number((location.getFeelsLikeTemp()))) + "c"}</h1>
                            <h1>{"Cloud Level: " + location.getCloudAmount() + "%"}</h1>
                            <h1>{"Wind Speed: " + location.getWindSpeed() + "mph"}</h1>
                            <h1>{"Wind Bearing: " + location.getWindBearing() + "°"}</h1>
                            <h1>{"Humidity: " + location.getHumidity() + "%"}</h1>
                        </div>
                        <button
                            className="w-24 mt-auto outline-none border-none mt-6 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 m-2"
                            onClick={() => setOpen(false)}>
                            Close
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}