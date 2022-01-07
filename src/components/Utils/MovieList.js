const API_BASE = process.env.REACT_APP_PUBLIC_URL;

/*
    - Originais da Netflix
    - Recomendados (Trending)
    - Em alta (Top rated)
    - Ação
    - Comédia
    - Terror
    - Romance
    - Documentários
*/

const basicFetch = async (endpoint) => {
    
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export const MovieList = {
    getHomeList: async () => {
        return [
            {
                slug: 'toprated',
                title: 'Adicionados recetemente',
                type: 'movie',
                items: await basicFetch(`/recente/movie/`)
            }/*
            {
                slug: 'action',
                title: 'Ação',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'acao'}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'comedia'}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'terror'}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'romance'}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'documentario'}`)
            }*/
        ]
    },
        getMovieInfo: async (id, type) => {
            let info = {};
            
            if (id) {
                switch (type) {
                    case 'movie':
                        info = await basicFetch(`/movie/${id}`);
                        break;
                    case 'tv':
                        info = await basicFetch(`/tv/${id}`);
                        break;
                    case 'serie':
                        info = await basicFetch(`/serie/${id}`);
                        break;
                    default:
                        info = null;
                        break;
                }
            }
            return info;
        },
            getTrailerVideo: async (Id, type) => {
                let trailer = {};

                if (Id) {
                    switch (type) {
                        case 'movie':
                            trailer = await basicFetch(`/movie/${Id}`);
                            break;
                        case 'tv':
                            trailer = await basicFetch(`/tv/${Id}`);
                            break;
                        case 'serie':
                            trailer = await basicFetch(`/tv/${Id}`);
                            break;
                        default:
                            trailer = null;
                            break;
                    }
                }
                return trailer;
            },
}

export default MovieList