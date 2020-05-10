
import { GET_PAGE_TEXT, GET_MOVIES, postMovies } from "./query";
import {makeTextBlocks, getProperNouns, getMoviesFromWitResponse} from './utils';
const axios = require('axios')

async function getPageText(url: string): Promise<void> {
    const queryUrl = `https://boilerpipe-web.appspot.com/extract?url=${url}&extractor=ArticleExtractor&output=text`
    axios({url: queryUrl, method: 'get'})
    .then(
        (response) => {
            getMovies(response.data)
        }
    );
}

const API_KEY = "V3MGGSB2HZWX3KXHXUB4A6VUB7MXVROV"

async function getMovies(text: string): Promise<void> {
    const properNouns = getProperNouns(text)
    const textBlocks = makeTextBlocks(properNouns, 270)
    textBlocks.forEach((textBlock) => {
        const encodedTextBlock = encodeURI(textBlock)
        const queryUrl = `https://api.wit.ai/message?v=20200509&q=${encodedTextBlock}`
        axios({url: queryUrl, method: 'get', headers: { "Authorization": `Bearer ${API_KEY}` }})
            .then(
                (response) => {
                    const movies = getMoviesFromWitResponse(response.data)
                    postMovies(movies)
                }
            );
    })
}

async function onRequest(request, sender, sendResponse) {
    if (request.action === GET_PAGE_TEXT) {
        getPageText(request.url)
    }
    else if (request.action === GET_MOVIES) {
        getMovies(request.text)
    }
    return true;
}
chrome.runtime.onMessage.addListener(onRequest);
