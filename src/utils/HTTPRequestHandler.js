import axios from "axios";

const ADDRESS = "http://localhost:4567/";
export const USERNAME_VALIDITY_ENDPOINT = ADDRESS + "account/"
export const CREDENTIALS_VALIDITY_ENDPOINT = ADDRESS + "account/validate"
export const ACCOUNT_CREATION_ENDPOINT = ADDRESS + "account/create"
export const ARTICLES_ENDPOINT = ADDRESS + "articles"
export const LOCATIONS_ENDPOINT = ADDRESS + "locations"
export const LOCATION_DATA_ENDPOINT = ADDRESS + "location/"

axios.defaults.headers.common["Accept"] = "application/json";

export function get(url, params, callback) {
    axios.get(url).then(result => callback(result))
}

export function post(url, data, callback) {
    axios.post(url, data).then(result => callback(result))
}

export function head(url, data, callback) {
    axios.head(url, data).then(result => callback(result))
}