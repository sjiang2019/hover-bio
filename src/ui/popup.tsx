import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import * as ReactDOM from "react-dom"
import Spinner from "react-bootstrap/Spinner"
import _ from 'underscore'

import { POST_STREAMING, storeData } from '../app/query'
import MovieListing from './MovieListing'
import "../styles/popup.css"
import { MovieInfo } from './constants';

function Popup(): JSX.Element {
    const [movieInfos, setMovieInfos] = React.useState<Array<MovieInfo>>([]);

    const handleChangeMovieInfo = (newMovieInfo: MovieInfo) => {
        setMovieInfos([...movieInfos, newMovieInfo])
    }

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.action === POST_STREAMING) {
                storeData([...movieInfos, request.movieInfo])
                handleChangeMovieInfo(request.movieInfo)
            }
        }
    );

    return (
        <>
            {movieInfos && movieInfos.length > 0 ?
                <MovieListing movieInfos={movieInfos} /> :
                <Spinner animation={"border"} />
            }
        </>
    )
}

// --------------

ReactDOM.render(
    <Popup />,
    document.getElementById('root')
)
