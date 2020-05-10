
export const GET_PAGE_TEXT = 'get-page-text';
export const GET_MOVIES = 'get-movies'
export const POST_MOVIES = 'post-movies'

export function queryPageText() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = encodeURI(tabs[0].url);
        chrome.runtime.sendMessage({ action: GET_PAGE_TEXT , url: url });
    });
}

export function queryMovies(text: string) {
    chrome.runtime.sendMessage({ action: GET_MOVIES , text: text });
}

export function postMovies(movies: Array<string>) {
    chrome.runtime.sendMessage({ action: POST_MOVIES, movies: movies });
}
