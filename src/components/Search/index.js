import React, { useEffect, useContext } from "react"
import "./search.css"
import SearchContext from "./context"

const Search = ({ movies, type, onClose }) => {

    const { updateSearchInput } = useContext(SearchContext)

    useEffect(() => {


    })


    const renderPosters = (data) => {

        return data.map((item, index) => {

            if (item.capa) return <div key={index}><a href={`/details/${type}/${item._id}`} ><img src={`${process.env.REACT_APP_PUBLIC_URL}${item.capa}`} alt={"poster"} /></a></div>
            return null


        })
    }


    return (
        <div className="search-background">

            {movies ? (
                <React.Fragment>
                    {movies.length ? (
                        <React.Fragment>
                            <div className="search-container">{renderPosters(movies)}
                                {onClose &&
                                    <button className="featured--close"
                                        onClick={() => {
                                            console.log('clicou limpar')
                                            return updateSearchInput('')
                                        }}
                                    >
                                        <img
                                            style={{ width: "30px" }}
                                            src={"./close.png"}
                                            alt="close icon"
                                            onClick={() => console.log('clicou limpar')}
                                        />
                                    </button>
                                }
                            </div>
                        </React.Fragment>

                    ) : (<div className="not-found">Não encontramos nanda, desculpa mesmo! :/ </div>)}
                </React.Fragment>
            ) : (
                <div className="loading-content">
                    <div className="loading-circle"></div>
                    <span className="loading-name">CARREGANDO...</span>
                </div>

            )}

        </div>
    )
}

export default Search