import NavbarComponent from "../components/NavbarComponent";
import BannerComponent from "../components/BannerComponent";
import FooterComponent from "../components/FooterComponent";
import React, {useState} from "react";
import SwitchComponent from "../components/SwitchComponent";
import getIcon from "../utils/Icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ARTICLES_ENDPOINT, get} from "../utils/HTTPRequestHandler";
import {Dialog} from "@headlessui/react";

const articles = []; // static array to store loaded articles

export default function EducationPage() {

    const [filterEnvironmentalArticles, setFilterEnvironmentalArticles] = useState(false);
    const [filterAirQualityArticles, setFilterAirQualityArticles] = useState(false);
    const [onlyFavouriteArticles, setOnlyFavouriteArticles] = useState(false);
    const [loaded, setLoaded] = useState(false);

    if (!loaded) {
        get(ARTICLES_ENDPOINT, {},
            response => {
                Object.keys(response.data).forEach(key => {
                    let article = new Article(key, JSON.parse(response.data[key]))
                    let found = false;
                    articles.forEach(element => {
                        if (element.title === article.title) {
                            found = true;
                        }
                    })
                    if (!found) {
                        articles.push(article)
                    }
                })
                setLoaded(true)
            },
            error => {
                console.log(error)
            })
    }

    /**
     * @param article the article
     *
     * @returns {boolean} whether the provided article is filtered out or not
     */
    function isArticleFilteredOut(article) {
        return (filterEnvironmentalArticles && article.hasTag("ENVIRONMENTAL"))
            || (filterAirQualityArticles && article.hasTag("AIR_QUALITY"));
        // TODO: impl favourite article filtering?
    }
    
    return (
        <>
            <NavbarComponent/>
            <BannerComponent src={"education-banner.jpg"} alt={"Image of a health professional talking to a patient"}/>
            {/* Articles Title */}
            <div className={"flex flex-col w-full font-mono font-bold flex items-center justify-center mt-5 mb-2 text-4xl"} >
                <h1>Our Articles</h1>
                <h1 className={"text-sm italic mt-2"}>Click any article to read it!</h1>
            </div>

            {/* Articles div */}
            <div className={"pt-8 pl-24 pr-24 w-full flex gap-8"}>
                {/* Articles filter / control panel */}
                <div className={"w-1/4 flex flex-col gap-2"}>
                    <h1 className={"flex justify-start font-mono font-bold text-2xl mb-2"}>Options</h1>
                    <SwitchComponent
                        description={"No Environment Articles"}
                        state={filterEnvironmentalArticles}
                        setState={setFilterEnvironmentalArticles}
                    />
                    <SwitchComponent
                        description={"No AirQuality Articles"}
                        state={filterAirQualityArticles}
                        setState={setFilterAirQualityArticles}
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
                        <div className={"overflow-y-auto h-96 flex flex-col gap-2"}>
                            {articles.map(article =>
                                !isArticleFilteredOut(article) && <ArticleComponent article={article}/>
                            )}
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

    id
    title
    blurb
    text
    tags


    constructor(id, data) {
        this.id = id;
        this.title = data["title"];
        this.blurb = data["blurb"];
        this.text = data["text"];
        this.tags = JSON.parse(data["tags"]);
    }

    /**
     * @returns {string} A list of tags representing this article
     */
    formatTags() {
        let tags = "";
        this.tags.forEach(tag => {
            if (tag !== undefined) {
                tag = tag.toLowerCase();
                let char = tag.charAt(0);
                let tagName = char.toUpperCase() + tag.substring(1, tag.length)
                tags += tagName += ", "
            }
        })
        return tags.substring(0, tags.length - 2);
    }

    /**
     * Whether this article has the provided tag
     * 
     * @param tag the tag to search for
     * @returns {boolean} whether this article has the provided tag
     */
    hasTag(tag) {
        let found = false;
        this.tags.forEach(thisTag => {
            if (thisTag === tag) {
                found = true;
            }
        })
        return found;
    }
}

/**
 * Represents an article on the webpage
 *
 * @param props article - the article class object
 * @returns {JSX.Element}
 */
function ArticleComponent(props) {

    const [open, setOpen] = useState(false);

    let article = props.article;
    return (
        <div>
            <div
                className={"w-full flex bg-slate-200 h-24 rounded-lg border-2 border-black relative hover:bg-slate-300"}
                data-modal-target={`${article.title}-modal`}
                data-modal-toggle={`${article.title}-modal`}
                onClick={() => {
                    setOpen(true)
                }}>
                {/* Preview div */}
                <div className={"flex-col m-2"}>
                    <h1 className={"text-xl font-mono font-bold"}>{article.title}</h1>
                    <h1 className={"truncate"}>{article.blurb}</h1>
                    <div className={"flex justify-bottom items-end"}>
                        <FontAwesomeIcon className={"mb-1 mr-1"} icon={getIcon("tag")}/>
                        {article.formatTags()}
                    </div>
                </div>
                {/* Filler div */}
                <div className={"flex w-2/4"}></div>
                <div className={"flex w-1/4"}>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}>
                <div className={"fixed inset-0 flex items-center justify-center p-4"}>
                    <Dialog.Panel className={"flex flex-col w-full max-w-sm rounded bg-white border-2 border-black w-96 h-96 align-middle"}>
                        <Dialog.Title className={"text-xl font-mono font-bold m-2"}>{article.title}</Dialog.Title>
                        <p className={"text-center overflow-y-auto mt-4 mb-4"}>
                            {article.text}
                        </p>
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