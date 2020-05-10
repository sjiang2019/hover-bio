import * as React from "react"
import MovieCard from './MovieCard'
import { MovieInfo } from "./constants"

interface MovieListingProps {
    movieInfos: Array<MovieInfo>;
}

export default function MovieListing(props: MovieListingProps): JSX.Element {
    return (
        <div>
            {props.movieInfos.map((movieInfo) => (
                <MovieCard movieInfo={movieInfo} />
            ))}
        </div>
    )
}
