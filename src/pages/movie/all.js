import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import MovieList from '../../components/Utils/MovieList';
import Header from '../../components/Header/index';
import SearchContext from '../../components/Search/context';
import Search from '../../components/Search/index'



// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState(null);
  const [movieFilter, setmovieFilter] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);
  const [dashVisible, setdashVisible] = useState(false);
  const context = useContext(SearchContext)



  const fetchData = useCallback(async () => {
    if (context.searchInput.length > 2) {

      const filterList = await MovieList.getAllByFilter(context.searchInput)
      if (filterList.length > 0) {
        setmovieFilter(filterList)
      }
    }

  }, [context]);





  useEffect(() => {

    const loadAll = async () => {
      //
      const list = await MovieList.getAllByFilter('xx')
      console.log('lista',list)
      setMovieList(list);
    }

    loadAll();
    fetchData();

    return () => {
      setmovieFilter(null)
      setMovieList([])
    }



  }, [fetchData]);

  const showCatalago = (filter, list) => {

    if (filter == null) {
      if (list !== null) {        
          return <Search movies={list} type={"search"} />
        }  
      return null
    } else {
      if (filter.length > 0) {
        return <Search movies={filter} type={"search"} />
      } else {
        return <Search movies={list} type={"search"} />
      }
    }

  }


  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    }
    const cadastrar = (event) => {
      const ESCAPE_KEY = 27;
      const C_KEY = 67
      if (event.keyCode === C_KEY && event.ctrlKey) {
        setdashVisible(true)
        return
      }
      if (event.keyCode === ESCAPE_KEY) {
        setdashVisible(false)
        return
      }


    }



    window.addEventListener('scroll', scrollListener);
    window.addEventListener('keydown', cadastrar);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('keydown', cadastrar);
      setblackHeader(false)
      setdashVisible(false)
    }
  }, []);



  return (

    <div className="page">

      <Header dash={dashVisible} button={<li className="ml-auto">   <Link className="btn btn-sm btn-info" to={{ pathname: '/dashboard' }}>Cadastrar</Link></li>} black={blackHeader} />

      {showCatalago(movieFilter, movieList)}


      <footer>
        Aproveitem
      </footer>
      {movieList == null ?
        <div className="loading">
          <img src={"/loading.gif"} alt="loading"></img>
        </div>
        : null
      }
    </div>
  )
}
