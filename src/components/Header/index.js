
import React, { useEffect, useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchContext from "../Search/context"
import './styles.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const { button, black, dash } = props;
    const [searchBox, setSearchBox] = useState(false)
    const { searchInput, updateSearchInput } = useContext(SearchContext)
    const ref = useRef(null)
    const inputRef = useRef(null)

    const toggleSearchBox = () => {

        if (!searchBox && inputRef.current) inputRef.current.focus();

        setSearchBox(prevState => !prevState)

    }

    return (
        <header className={`${black ? 'pin-header' : ''}`} ref={ref}>
            <div className="logo">
                <img src={"/logo192.png"} />
            </div>

            <div className="header-menu">
                <ul className="header-list">                   
                    <li className="header-list-item"><a href={"/"} className="active">Inicio</a></li>
                    <li className="header-list-item"><a href={"/movies"}>Filmes</a></li>
                    
                </ul>
            </div>




            <div className="header-options">
                <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
                    <span className="icon" onClick={() => toggleSearchBox()}><FontAwesomeIcon icon={faSearch} /></span>
                    <input className="searchInput"
                        ref={inputRef}
                        value={searchInput}
                        onChange={(e) => updateSearchInput(e.currentTarget.value)}
                        onBlur={() => setSearchBox(false)}
                        type="text" placeholder="Titulos" maxLength="80" />
                </div>
                <div>
                    <span className="icon">
                        {dash && button}
                    </span>
                </div>


            </div>

        </header>
    )
}

/****
           <header ref={ref} className={black ? "black" : ''}>
           <div className="header--logo">
           <img src={process.env.PUBLIC_URL + "/logo192.png"} />
           </div>
           <div className="header--user">
               <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
               <span className="icon" onClick={() => toggleSearchBox()}><FontAwesomeIcon icon={faSearch} /></span>
               <input className="searchInput"
               ref={inputRef}
               value={searchInput}
               onChange={(e) => updateSearchInput(e.currentTarget.value)}
               onBlur={() => setSearchBox(false)}
               type="text" placeholder="Titles, People, Genres..." maxLength="80" />
               </div>
               </div>
               <div className="header--RegisterButton">
               {dash && button}
               </div>
               
               
               
               </header>
           */