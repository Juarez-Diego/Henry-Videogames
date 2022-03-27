
const initialState = {
    videogames: [],
    genres: [],
    videogameDetail: [],
    allVideogamesCopy: [],
    platforms: []

}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogamesCopy: action.payload,
            }
            
        case "GET_VIDEOGAME_BY_NAME": 
            return {
                ...state,
                videogames: action.payload
            }

        case "GET_GENRES": 
            return {
                ...state,
                genres: action.payload
            }

        case "GET_PLATFORMS":
            return{
                ...state,
                platforms: action.payload
            }
        
        case "GET_A_VIDEOGAME":
            return {
                ...state,
                videogameDetail: action.payload
            }

        case "CREATE_A_VIDEOGAME":
            return {
                ...state
            }

        case "SORT_ALPHABETICALLY":
            const alphabet = action.payload === "Ascending" ?
            state.videogames.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1
                return 0;
            }) :
            state.videogames.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1
                return 0;
            });
            return{
                ...state,
                videogames: [...alphabet]
            }

        case "SORT_BY_RATING":
            const sortRating = action.payload === "High" ?
            state.videogames.sort((a, b) => {
                if(a.rating < b.rating) return 1;
                if(b.rating < a.rating) return -1
                return 0;
            }) :
            state.videogames.sort((a, b) => {
                if(a.rating < b.rating) return -1;
                if(b.rating < a.rating) return 1;
                return 0;
            })
            return {
                ...state,
                videogames: [...sortRating]
            }
            
        case "FILTER_BY_GENRES":
            const getGenres = state.allVideogamesCopy
            const filtering = action.payload === "All" ? getGenres :
            state.videogames.filter(e => {
                if(e.genres) {
                    if(e.genres.includes(action.payload)) {
                        return e
                    }
                }
            })
            return {
                ...state,
                videogames: filtering,
             
            }

        case "FILTER_BY_SOURCE":
            if (action.payload === "All") {
                return {
                  ...state,
                  videogames: state.allVideogamesCopy
                  
                };
              } else if (action.payload === "Database") {
                return {
                  ...state,
                  videogames: state.allVideogamesCopy.filter((e) => e.createdInDb === true)
                };
              } else {
                return {
                  ...state,
                  videogames: state.allVideogamesCopy.filter((e) => e.createdInDb === undefined)
                };
              }

        default: return state;
    }
};

export default rootReducer;