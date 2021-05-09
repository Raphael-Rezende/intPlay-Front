import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import AddTutorial from '././components/RegisterMovie/index'
import Button from './components/Botao/index'

import {
  Modal,
  useModal,
  ModalTransition,
} from 'react-simple-hook-modal';


import { ModalProvider } from 'react-simple-hook-modal';



// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header button={<Button buttonclick={openModal} text="Open"/>} black={blackHeader} />

      <div style={{display:"inline-block", verticalAlign:"middle", height:"50%", textAlign:"left",alignItems: "center", width: "50%", position: "absolute", top: "10%",transform: "translate(50%, -10%)"}}>
        <ModalProvider>

          <Modal
            isOpen={isModalOpen}
            transition={ModalTransition.BOTTOM_UP}
          >
            <AddTutorial/>
          </Modal>
        </ModalProvider>
      </div>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))

        }
      </section>
      <footer>
        Feito em Live (https://www.youtube.com/watch?v=tBweoUiMsDg) para estudo de react, todos os direitos das imagens são da Netflix.
        Dados Extraidos de https://www.themoviedb.org/
      </footer>


      {movieList.length > 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      }
    </div>
  )
}



// https://youtu.be/tBweoUiMsDg?t=8054