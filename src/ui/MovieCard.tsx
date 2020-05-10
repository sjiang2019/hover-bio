import * as React from "react"
import Spinner from "react-bootstrap/Spinner"

import { MovieInfo, StreamLink } from './constants'

interface MovieCardProps {
    movieInfo: MovieInfo;
}

export default function MovieCard(props: MovieCardProps): JSX.Element {
    return (
        <>
            {props.movieInfo ?
                <div>
                    <h3>{props.movieInfo.title}</h3>
                    <ul>
                        {
                            props.movieInfo.links.map((link: StreamLink) => (
                                <li> <a href={link.href} > {link.text}: {link.price} </a> </li>
                            ))
                        }
                    </ul>
                </div> :
                <Spinner animation={"border"} />
            }
        </>
    )
}