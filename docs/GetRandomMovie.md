# Get random movie

Used to get a random movie.

**URL** : `/api/movie/`

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
    {
        "id": 195,
        "title": "Gran Torino",
        "year": 2008,
        "runtime": 116,
        "genres": ["Drama", "Thriller"],
        "director": "Clint Eastwood",
        "actors": "Clint Eastwood, Christopher Carley, Bee Vang, Ahney Her",
        "plot": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",
        "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTQyMTczMTAxMl5BMl5BanBnXkFtZTcwOTc1ODE0Mg@@._V1_SX300.jpg"
    }
]
```

## Error Response

**Condition** : If there are no movies in the database.

**Code** : `500`

**Content** :

```json
{
    "error": "There are no movies in the database"
}
```
