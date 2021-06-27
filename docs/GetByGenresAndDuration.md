# Get movies by genres and duration
Used to get movies by genres and runtime between FROM and TO. Movies will be sorted 
based on how many 
genres 
matched the requirements.

**URL** : `/api/movie/{genres}/{durationFrom}/{durationTo}`

**Method** : `GET`

**Auth required** : NO

**Data constraints**

```json
  "genres": string,string,string...;
```
Provided strings should be one of these: [GENRES](Genres.md)
```json
    "durationFrom": number;
    "durationTo": number;
```
Above have to be a number of MINUTES and between 1 and 1000. 

**Example**

```
	/api/movie/Crime,Thriller,War,Action/100/140
	
	/api/movie/Music/30/75
```  

## Success Response

**Code** : `200 OK`

**Content example**

```json 
[  
   {    
	    id: 43,   
	    title: "Movie",  
	    year: 2008,   
	    runtime: 101,    
	    genres: ["Thriller", "Crime"],   
	    director: "Best Director",   
	    actors: "Clint Eastwood, Christopher Carley, Bee Vang, Ahney Her",      
	    plot: "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",      
	    posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTQyMTczMTAxMl5BMl5BanBnXkFtZTcwOTc1ODE0Mg@@._V1_SX300.jpg"   
   },   
   {    
	    id: 195,   
	    title: "Gran Torino",  
	    year: 2008,
	    runtime: 116,    
	    genres: ["War"],   
	    director: "Clint Eastwood",   
	    actors: "Clint Eastwood, Christopher Carley, Bee Vang, Ahney Her",      
	    plot: "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.",      
	    posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTQyMTczMTAxMl5BMl5BanBnXkFtZTcwOTc1ODE0Mg@@._V1_SX300.jpg"   
	}
]  
```

## Error Response

**Condition** : If there are no movies in the database.

**Code** : `500`

**Content** :

```json  
{    
	error: "There are no movies in the database", 
}  
```

**Condition** : If genres parameter was invalid (not contained in [GENRES](Genres.md))

**Code** : `400`

**Content** :

```json  
{    
	error: "At least some of provided genres are invalid", 
}  
```
**Condition** : If duration sent as parameters was invalid:

- a negative number
- smaller than 1
- bigger than 1000
- a string not convertible to integer
- duration-from bigger than duration-to


**Code** : `400`

**Content** :

```json  
{    
	error: "Error message here", 
}  
```