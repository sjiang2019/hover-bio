import _ from 'underscore'
import {
    GET_PAGE_TEXT,
    GET_MOVIES,
    GET_STREAMING,
    postStreaming,
} from "./query";
import { makeTextBlocks, getProperNouns, getMoviesFromWitResponse, parseMovieInformation } from './utils';
const axios = require('axios')
const cheerio = require('cheerio')

async function getPageText(url: string): Promise<void> {
    const queryUrl = `https://boilerpipe-web.appspot.com/extract?url=${url}&extractor=ArticleExtractor&output=text`
    const { data } = await axios({ url: queryUrl, method: 'get', headers: { "Content-Type": "application/json" } })
    getMovies(data)
}

const API_KEY = "V3MGGSB2HZWX3KXHXUB4A6VUB7MXVROV"

function getMovies(text: string): void {
    const properNouns = getProperNouns(text)
    const textBlocks = makeTextBlocks(properNouns, 270)
    let seenMovies = new Set([])
    textBlocks.forEach(async (textBlock) => {
        const encodedTextBlock = encodeURI(textBlock)
        const queryUrl = `https://api.wit.ai/message?v=20200509&q=${encodedTextBlock}`
        const { data } = await axios({ url: queryUrl, method: 'get', headers: { "Authorization": `Bearer ${API_KEY}` } })
        const newMovies = getMoviesFromWitResponse(data)
        newMovies.forEach((movie) => {
            if (!seenMovies.has(movie)) {
                seenMovies.add(movie)
                getStreaming(movie)
            }
        })
    })
}

async function getStreaming(movieTitle: string): Promise<void> {
    const query = `watch ${movieTitle} movie`
    const googleQueryUrl = `https://www.google.com/search?q=${query}`
    const { data } = await axios.get(googleQueryUrl)
    const $ = cheerio.load(data)
    const movieInfo = parseMovieInformation($, movieTitle)
    console.log("POSTING STREAMING")
    postStreaming(movieInfo)
}

async function onRequest(request, sender, sendResponse) {
    if (request.action === GET_PAGE_TEXT) {
        getPageText(request.url)
    }
    else if (request.action === GET_MOVIES) {
        getMovies(request.text)
    }
    else if (request.action === GET_STREAMING) {
        getStreaming(request.movieTitle)
    }
    return true;
}

chrome.runtime.onMessage.addListener(onRequest);

