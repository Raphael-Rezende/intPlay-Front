import React, { useEffect, useState } from 'react';
import MovieList from '../../components/Utils/MovieList';
import { useParams } from 'react-router';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import './styles.css';
import { Link } from 'react-router-dom';

function Details(){
    const { id, type } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [urlVideo, setUrlVideo] = useState();
    const [videoFullScreen, setVideoFullScreen] = useState(false);
    const [descriptionVideo, setDescriptionVideo] = useState();

    useEffect(() => {
        const loadAll = async () => {
            let movie = id
           // let trailer = await MovieList.getTrailerVideo(id, type)
            setMovieDetails(movie);
            setUrlVideo(movie.url);
            setDescriptionVideo(movie.sinopse.length > 120 ? movie.sinopse.substring(0, 120) + '...' : movie.sinopse);
            //console.log(movie)
        }
        loadAll();
    }, [id, type])


    function handleVideoFullScreen(){
        setVideoFullScreen(!videoFullScreen);
    }
    
    
    return (
        <main 
            className="details" 
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${movieDetails.backdrop})`
            }}
        >   
        <Link to="/" className="details--backbutton">Voltar</Link>
            <section> 
                <div>
                    <div className="details--info">
                        <h3 className={'positive'}>{10}</h3>
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