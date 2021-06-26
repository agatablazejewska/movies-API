import MovieModel from '../src/resources/movie/movie.model';
import { GENRES } from '../src/shared/enums/genres';

export const genres = [
    "Comedy",
    "Fantasy",
    "Crime",
    "Drama",
    "Music",
    "Adventure",
    "History",
    "Thriller",
    "Animation",
    "Family",
    "Mystery",
    "Biography",
    "Action",
    "Film-Noir",
    "Romance",
    "Sci-Fi",
    "War",
    "Western",
    "Horror",
    "Musical",
    "Sport"
];

export const movies: MovieModel[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: "1994",
        runtime: "142",
        genres: [
            GENRES.CRIME,
            GENRES.DRAMA
        ],
        director: "Frank Darabont",
        actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg"
    },
    {
        id: 2,
        title: "The Intouchables",
        year: "2011",
        runtime: "112",
        genres: [
            GENRES.BIOGRAPHY,
            GENRES.COMEDY,
            GENRES.DRAMA
        ],
        director: "Olivier Nakache, Eric Toledano",
        actors: "François Cluzet, Omar Sy, Anne Le Ny, Audrey Fleurot",
        plot: "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
        posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg"
    },
    {
        id: 3,
        title: "Planet 51",
        year: "2009",
        runtime: "91",
        genres: [
            GENRES.ANIMATION,
            GENRES.ADVENTURE,
            GENRES.COMEDY
        ],
        director: "Jorge Blanco, Javier Abad, Marcos Martínez",
        actors: "Jessica Biel, John Cleese, Gary Oldman, Dwayne Johnson",
        plot: "An alien civilization is invaded by Astronaut Chuck Baker, who believes that the planet was uninhabited. Wanted by the military, Baker must get back to his ship before it goes into orbit without him.",
        posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTUyOTAyNTA5Ml5BMl5BanBnXkFtZTcwODU2OTM0Mg@@._V1_SX300.jpg"
    },
    {
        id: 4,
        title: "The Beach",
        year: "2000",
        runtime: "119",
        genres: [
            GENRES.ADVENTURE,
            GENRES.DRAMA,
            GENRES.ROMANCE
        ],
        director: "Danny Boyle",
        actors: "Leonardo DiCaprio, Daniel York, Patcharawan Patarakijjanon, Virginie Ledoyen",
        plot: "Twenty-something Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss - excited and intrigued, he sets out to find it.",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BN2ViYTFiZmUtOTIxZi00YzIxLWEyMzUtYjQwZGNjMjNhY2IwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
        id: 5,
        title: "Taxi Driver",
        year: "1976",
        runtime: "113",
        genres: [
            GENRES.CRIME,
            GENRES.DRAMA
        ],
        director: "Martin Scorsese",
        actors: "Diahnne Abbott, Frank Adu, Victor Argo, Gino Ardito",
        plot: "A mentally unstable Vietnam War veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BNGQxNDgzZWQtZTNjNi00M2RkLWExZmEtNmE1NjEyZDEwMzA5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        id: 6,
        title: "City of God",
        year: "2002",
        runtime: "130",
        genres: [
            GENRES.CRIME,
            GENRES.DRAMA
        ],
        director: "Fernando Meirelles, Kátia Lund",
        actors: "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        plot: "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
        posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    }
]

export const newMovie = {
    title: "Gran Torino",
    year: 2008,
    runtime: 116,
    genres: [
        GENRES.DRAMA
    ],
    director: "Clint Eastwood",
    actors: "Clint Eastwood, Christopher Carley, Bee Vang, Ahney Her",
    plot: "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",
    posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTQyMTczMTAxMl5BMl5BanBnXkFtZTcwOTc1ODE0Mg@@._V1_SX300.jpg"
}