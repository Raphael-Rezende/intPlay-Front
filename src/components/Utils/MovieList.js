import api from "../../services/http-common";

const API_BASE = "http://localhost:3006"

const basicFetch = async (endpoint) => {
    api.get('generos')
        .then(res => {
            const generos = res.data;
            generos.map(item => {
                if (item.genero === endpoint) {
                    api.get('/generos/populate/'+item._id).then(res => {
                        const req = res.data.movies
                        
                        console.log(req)
                        return req
                    })
                }
            })
        })

}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getHomeList: async () => {
        return [

            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch('Ação')
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch('Comédia')
            },
            {
                slug: 'comedyRomantic',
                title: 'Comédia Romantica',
                items: await basicFetch('Comédia Romantica')
            },
            {
                slug: 'comedyDramatic',
                title: 'Comédia Dramática',
                items: await basicFetch('Comédia Dramática')
            },
            {
                slug: 'scy-fi',
                title: 'Ficção Científica',
                items: await basicFetch('Ficção Científica')
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch('Drama')
            },
            {
                slug: 'historyReal',
                title: 'Baseado em Historia Real',
                items: await basicFetch('Baseado em Historia Real')
            },
            {
                slug: 'faroeste',
                title: 'Faroeste',
                items: await basicFetch('Faroeste')
            },
            {
                slug: 'aventura',
                title: 'Aventura',
                items: await basicFetch('Aventura')
            },
            {
                slug: 'biografia',
                title: 'Biografia',
                items: await basicFetch('Biografia')
            },
            {
                slug: 'fantasia',
                title: 'Fantasia',
                items: await basicFetch('Fantasia')
            },
            {
                slug: 'musical',
                title: 'Musical',
                items: await basicFetch('Musical')
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch('Romance')
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch('Terror')
            },
            {
                slug: 'suspense',
                title: 'Suspense',
                items: await basicFetch('Suspense')
            },
            {
                slug: 'policial',
                title: 'Policial',
                items: await basicFetch('Policial')
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch('Documentário')
            }


        ]
    }
}