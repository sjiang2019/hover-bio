import * as React from "react"


interface MovieListingProps {
    movies: Array<string>;
}

export default function MovieListing(props: MovieListingProps): JSX.Element {
    return (
        <div>
            {props.movies.map((movie) => (
                    <li>
                        {movie}
                    </li>
                ))}
        </div>
    )
}
