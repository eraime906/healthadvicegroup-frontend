import NavbarComponent from "../components/NavbarComponent";
import BannerComponent from "../components/BannerComponent";
import FooterComponent from "../components/FooterComponent";
import React, {useState} from "react";
import SwitchComponent from "../components/SwitchComponent";
import getIcon from "../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ARTICLES_ENDPOINT, get} from "../utils/HTTPRequestHandler";

const loadedArticles = [];

export default function EducationPage() {

    const [filterWeatherArticles, setFilterWeatherArticles] = useState(false);
    const [filterAllergenArticles, setFilterAllergenArticles] = useState(false);
    const [onlyFavouriteArticles, setOnlyFavouriteArticles] = useState(false);
    const [loaded, setLoaded] = useState(false);

    get(ARTICLES_ENDPOINT, {},
        response => {
        console.log("fetching articles")
            // when stuffs done
            Object.keys(response.data).forEach(key => {
                // Don't load articles that are already loaded
                loadedArticles.push(new Article(JSON.parse(response.data[key])));
            })
            setLoaded(true)
        },
        error => {console.log(error)})

    return (
        <>
            <NavbarComponent/>
            <BannerComponent src={"education-banner.jpg"} alt={"Image of a health professional talking to a patient"}/>
            {/* Articles Title */}
            <h1 className={"w-full font-mono font-bold flex items-center justify-center mt-5 mb-5 text-4xl"}>Our
                Articles</h1>
            {/* Articles div */}
            <div className={"pt-8 pl-24 pr-24 w-full flex gap-8"}>
                {/* Articles filter / control panel */}
                <div className={"w-1/4 flex flex-col gap-2"}>
                    <h1 className={"flex justify-start font-mono font-bold text-2xl mb-2"}>Options</h1>
                    <SwitchComponent
                        description={"Filter Weather Articles"}
                        state={filterWeatherArticles}
                        setState={setFilterWeatherArticles}
                    />
                    <SwitchComponent
                        description={"Filter Allergen Articles"}
                        state={filterAllergenArticles}
                        setState={setFilterAllergenArticles}
                    />
                    <SwitchComponent
                        description={"Favourite Articles Only"}
                        state={onlyFavouriteArticles}
                        setState={setOnlyFavouriteArticles}
                    />
                </div>
                {/* Articles display */}
                <div className={"w-3/4"}>
                    {/* If the articles are loading display a spinner */}
                    {!loaded &&
                        <div className={"flex w-full items-center gap-2"}>
                            <FontAwesomeIcon icon={getIcon("loader")} className="animate-spin"/>
                            <h1>Loading Articles...</h1>
                        </div>
                    }
                    {/* If the articles have loaded then display the articles */}
                    {loaded &&
                        <div>
                        </div>
                    }
                </div>
            </div>
            <FooterComponent/>
        </>
    )
}

/**
 * Represents an article
 */
class Article {

    title
    blurb
    text
    tags


    constructor(data) {
        this.title = data["title"];
        this.blurb = data["blurb"];
        this.text = data["text"];
        this.tags = data["tags"];
    }

    toComponent() {
        return ArticleComponent(this)
    }
}

/**
 * Represents an article on the webpage
 *
 * @param props article - the article class object
 * @returns {JSX.Element}
 */
function ArticleComponent(props) {
    return (
        <>
        </>
    )
}