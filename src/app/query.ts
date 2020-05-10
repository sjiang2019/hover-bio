import { MovieInfo } from "../ui/constants";

export const GET_PAGE_TEXT = 'get-page-text';
export const GET_MOVIES = 'get-movies'
export const POST_MOVIES = 'post-movies'
export const GET_STREAMING = 'get-streaming'
export const POST_STREAMING = 'post-streaming'
export const POST_MOVIE_INFOS = 'post-movie-infos'

export function queryPageText(url: string) {
    chrome.runtime.sendMessage({ action: GET_PAGE_TEXT , url: url });
}

export function postStreaming(movieInfo: MovieInfo) {
    chrome.runtime.sendMessage({ action: POST_STREAMING , movieInfo: movieInfo });
}

export function storeData(movieInfos: Array<MovieInfo>) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: POST_MOVIE_INFOS, movieInfos: movieInfos });
    });
}