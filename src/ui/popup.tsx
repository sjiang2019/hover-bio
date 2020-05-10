import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from "react"
import * as ReactDOM from "react-dom"
import Spinner from "react-bootstrap/Spinner"
import _ from 'underscore'


import { queryPageText, POST_MOVIES } from '../app/query'
import MovieListing from './MovieListing'
import "../styles/popup.css"

function addListener(action: string, attribute: string, onReceiveData: (newData: any) => void): void {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.action == action) {
                onReceiveData(request[attribute])
            }
        }
    );
}

function Popup(): JSX.Element {
    const [movies, setMovies] = React.useState([]);

    const handleUpdateMovies = (newMovies: Array<string>) => {
        setMovies(_.uniq([...movies, ...newMovies]))
    }

    React.useEffect(() => {
        queryPageText()
    }, [])

    addListener(POST_MOVIES, "movies", handleUpdateMovies)

    return (
        <>
        {movies && movies.length > 0 ?
            <MovieListing movies={movies} />  :
            <Spinner animation={"border"}/>
        }
        </>
    )
}

// --------------

ReactDOM.render(
    <Popup />,
    document.getElementById('root')
)
