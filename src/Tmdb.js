//const API_KEY = '';
const API_BASE = 'http://localhost:8080/';


const basicFecth = async (endpoint) =>{
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
     getHomeList : async () =>{
        return [
            {
                slug: 'originals',
                title : "Originais do Netflix",
                items : await basicFecth(``)
            },
            {
                slug: 'trending',
                title : "Recomendados para Você",
                items : await basicFecth(``)
            },
            {
                slug: 'toprated',
                title : "Em Alta",
                items : await basicFecth(``)
            },
            {
                slug: 'action',
                title : "Ação",
                items : await basicFecth(``)
            },
            {
                slug: 'comedy',
                title : "Comédia",
                items : await basicFecth(``)
            },
            {
                slug: 'horror',
                title : "Terror",
                items : await basicFecth(``)
            },
            {
                slug: 'romance',
                title : "Romance",
                items : await basicFecth(``)
            },            
            {
                slug: 'documentary',
                title : "Documentários",
                items : await basicFecth(``)
            },
        ]
     },

     getMovieInfo : async (movieId, type) =>{
        let info = {};
        if(movieId) {
            switch(type){
                case 'movie':
                    info = await basicFecth();
                break;
                 case 'tv':
                    info = await basicFecth(``);
                break;
                default:
                    info = null;
                break;
            }
        }

         return info;
     }
}