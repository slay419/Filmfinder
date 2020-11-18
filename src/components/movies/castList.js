import React, { useContext } from "react";
import MovieContext from "../../context/movie/movieContext";


const CastList = ({ cast }) => {
        const movieContext = useContext(MovieContext);
        const { removeActor } = movieContext;

        const handleRemove = (actor) => {
            removeActor(actor);
        }

        return (
            <ul>
                { (cast === undefined || cast === null || cast.length === 0) ? (
                    <></>
                ) : (
                    cast.map((actor) => (
                        <div>
                            <p>{actor}</p>
                            <button onClick={() => {handleRemove(actor)}}> remove </button>
                        </div>
                    ))
                )}
            </ul>
        )
}

export default CastList;