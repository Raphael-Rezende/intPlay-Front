import React, { useEffect, useState } from 'react';
import MovieList from '../../components/Utils/MovieList';
import { useParams } from 'react-router';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import './styles.css';
import { Link } from 'react-router-dom';

function Details() {
    const { id, type } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [urlVideo, setUrlVideo] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState(false);
    const [descriptionVideo, setDescriptionVideo] = useState();
    const [movieBackDrop, setmovieBackDrop] = useState({});

    useEffect(() => {
        const loadAll = async () => {
            console.log('loadAll')
            let movie = await MovieList.getMovieInfo(id, type)
            console.log('movie', movie)
            if (movie) {
                // let trailer = await MovieList.getTrailerVideo(id, type)
                setMovieDetails(movie);
                setmovieBackDrop(encodeURI(process.env.REACT_APP_PUBLIC_URL + movie.backdrop.replaceAll('\\', '/')))
                setUrlVideo(process.env.REACT_APP_PUBLIC_URL + movie.url);
                setDescriptionVideo(movie.sinopse.length > 120 ? movie.sinopse.substring(0, 120) + '...' : movie.sinopse);
                //console.log(movie)
            }
        }
        loadAll();
    }, [id, type])


    function handleVideoFullScreen() {
        setVideoFullScreen(!videoFullScreen);
    }


    return (
        <main
            className="details"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${movieBackDrop})`

            }}
        >
            <Link to="/" className="details--backbutton">Voltar</Link>
            <section>
                <div>
                    <div className="details--info">
                        <h3 className={movieDetails.classificacao < 16 ? 'positive' : 'negative'}>{movieDetails.classificacao}</h3>
                    </div>

                    <h1>{movieDetails.titulo}</h1>

                    <h4>{descriptionVideo}</h4>

                </div>
            </section>
            {
                urlVideo !== undefined
                &&
                <aside className={videoFullScreen ? 'video--fullscreen' : ''}>
                    <div>
                        <button onClick={() => handleVideoFullScreen()}><AspectRatioIcon /></button>
                    </div>
                    <iframe frameBorder="0" height="100%" width="100%" title="1"
                        src={urlVideo}>
                    </iframe>
                </aside>
            }
        </main>
    )
}

export default Details;