import axios from "axios";

const ADDRESS = "http://localhost:4567/";
export const USERNAME_VALIDITY_ENDPOINT = ADDRESS + "account/"
export const CREDENTIALS_VALIDITY_ENDPOINT = ADDRESS + "account/validate"
export const ACCOUNT_CREATION_ENDPOINT = ADDRESS + "account/create"
export const ARTICLES_ENDPOINT = ADDRESS + "articles"
export const LOCATIONS_ENDPOINT = ADDRESS + "locations"
export const LOCATION_DATA_ENDPOINT = ADDRESS + "location/"
export const CUSTOM_LOCATION = ADDRESS + "locationdata/"

axios.defaults.headers.common["Accept"] = "application/json";

export async function get(url, params, callback, error) {
    await axios.get(url)
        .then(result => callback(result))
        .catch(err => error(err))
}

export async function post(url, data, callback, error) {
    await axios({
        method: 'post',
        url: url,
        data: data
    })
        .then(result => callback(result))
        .catch(err => error(err))
}

export async function head(url, data, callback, error) {
    await axios.head(url, data)
        .then(result => callback(result))
        .catch(err => error(err))
}