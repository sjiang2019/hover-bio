import { queryPageText, POST_STREAMING, POST_MOVIE_INFOS } from './query'

window.onload=function(){
    if (document.documentElement.innerText.includes("movie")) {
        queryPageText(document.location.href)
    }
}
