import React, { useEffect, useState } from 'react';
import './styles.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ item }) => {

    const [movieBackDrop, setmovieBackDrop] = useState({});

    useEffect(() => {
        const loadAll = async () => {
            
            setmovieBackDrop(process.env.REACT_APP_PUBLIC_URL + item.backdrop.replaceAll('\\', '/'))
        }
        loadAll();
    })

    let genres = [];
    for (let i in item.generos) {
        genres.push(item.generos[i].genero);
    }

    let descr = item.sinopse;
    if (descr.length > 200) {
        descr = descr.substring(0, 200) + '...';
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${encodeURI(movieBackDrop)})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.titulo}</div>
                    <div className="featured--info">
                        <div className="featured--year">{item.ano}</div>
                        {/*<div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_season !== 1 ? 's' : ''}</div>*/}
                    </div>
                    <div className="featured--description">{descr}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item._id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add/${item._id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres">Gêneros: <strong> {genres.join(', ')} </strong></div>

                </div>
            </div>

        </section>
    )
}


