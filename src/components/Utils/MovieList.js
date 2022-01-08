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
    getAllByFilter: async (text) => {

        return await basicFetch(`/getall/${text}`)
    },
    getHomeList: async () => {
        const list = [
            {
                slug: 'toprated',
                title: 'Adicionados recetemente',
                type: 'movie',
                items: await basicFetch(`/recente/movie/`)
            },
            {
                slug: 'acao',
                title: 'Ação',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'Ação'}`)
            },
            {
                slug: 'aventura',
                title: 'Aventura',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'Aventura'}`)
            },
            {
                slug: 'fantasia',
                title: 'Fantasia',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'Fantasia'}`)
            },
            {
                slug: 'baseadohistoriareal',
                title: 'Baseado em Historia Real',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'Baseado em Historia Real'}`)
            },
            {
                slug: 'faroeste',
                title: 'Faroeste',
                type: 'movie',
                items: await basicFetch(`/genero/movie/${'Faroeste'}`)
            }
        ]

        const listfilter = list.filter(item => item.items.length > 0)
        return listfilter
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
                    info = await basicFetch(`/movie/${id}`);
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