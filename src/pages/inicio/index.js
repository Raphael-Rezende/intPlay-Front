import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from '../../components/Utils/MovieList';
import FeaturedMovie from '../../components/FeaturedMovie/index';
import Header from '../../components/Header/index';
import Slider from '../../components/NetflixSlider'
import SearchContext from '../../components/Search/context';
import Search from '../../components/Search/index'



// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [movieFilter, setmovieFilter] = useState(null);
  const [featuredData, setFeaturedData] = useState(null);
  const [movieType, setmovieType] = useState(null);
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

  const onClose = () => {
    console.log('close')
    context.updateSearchInput('');
  }



  useEffect(() => {

    const loadAll = async () => {
      //
      let list = await MovieList.getHomeList();
      console.log(list)
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'toprated');
      if (originals.length > 0) {

        let randomChosen = Math.floor(Math.random() * (originals[0].items.length - 1));
        let movieChosen = originals[0].items[randomChosen];
        let movieType = originals[0].type;

        let movieChosenData = movieChosen;
        setmovieType(movieType)
        setFeaturedData(movieChosenData);
      }
    }

    loadAll();
    fetchData();

    return () => {
      setmovieType(null)
      setFeaturedData(null)
      setmovieFilter(null)
      setMovieList([])
    }



  }, [fetchData]);


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

      {
        movieFilter ?
          <Search movies={movieFilter} type={"search"} onClose={onClose} />
          :
          <div>
            {featuredData &&
              <div>
                <FeaturedMovie item={featuredData} type={movieType} />
              </div>
            }
            <di>

              <section style={{ marginTop: '50px' }} className="lists">
                {movieList.length > 0 && movieList.map((item, key) => (
                  <di>

                    <div ><h1>{item.title}</h1></div>
                    <Slider type={item.type}>
                      {item.items.map(movie => (
                        <Slider.Item movie={movie} key={movie.id}>{movie.titulo}</Slider.Item>
                      ))}
                    </Slider>
                  </di>
                ))

                }
              </section>

            </di>

          </div>
      }


      <footer>
        Aproveitem
      </footer>
      {movieList.length <= 0 ?
        <div className="loading">
          <img src={process.env.PUBLIC_URL + "/loading.gif"} alt="loading"></img>
        </div>
        : null
      }
    </div>
  )
}
