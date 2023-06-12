import {
    GET_POKEMONS,
    SELECT_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_POKEMON_BY_NAME,
    ORDER_POKEMONS,
    CREATE_POKEMON,
    GET_TYPES,
    FILTER_BY_TYPE,
    FILTER_BY_STATE
} from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    allTypes: [],
    types: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // CASES PARA POKEMONS
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: [...action.payload],
                allPokemons: [...action.payload]
            };
        case SELECT_POKEMONS:
            return {
                pokemonDetail: action.payload
            };
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemons: action.payload
            };
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemons: action.payload
            };
        case ORDER_POKEMONS:
            let orderedPokemons = [];
            switch (action.payload) {
                // Order by name
                case "AlphAsc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.name > b.name) return 1;
                        if (b.name > a.name) return -1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                case "AlphDesc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.name > b.name) return -1;
                        if (b.name > a.name) return 1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                // Order by attack
                case "AttAsc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.attack > b.attack) return 1;
                        if (b.attack > a.attack) return -1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                case "AttDesc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.attack > b.attack) return -1;
                        if (b.attack > a.attack) return 1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                // Order by spAttack
                case "SpAtAsc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.spAttack > b.spAttack) return 1;
                        if (b.spAttack > a.spAttack) return -1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                case "SpAtDesc":
                    orderedPokemons = state.pokemons.sort(function(a, b) {
                        if (a.spAttack > b.spAttack) return -1;
                        if (b.spAttack > a.spAttack) return 1;
                        return 0;
                    });
                    return {
                        ...state,
                        pokemons: orderedPokemons
                    };
                default:
                    return {
                        ...state
                    };
            };
        case CREATE_POKEMON:
            return {
                ...state
            };
        
        // CASES PARA TYPES
        case GET_TYPES:
            return {
                ...state,
                allTypes: [...action.payload]
            };
        case FILTER_BY_TYPE:
            if (action.payload === "all") return { ...state, pokemons: [...state.allPokemons] };
            let allPokemonsByType = [
                ...state.allPokemons.filter((t) => {
                    return (
                        action.payload === t.type?.find((p) => p === action.payload)
                    );
                })
            ];
            return {
                ...state,
                pokemons: [...allPokemonsByType]
            };

        // CASE PARA POKEMONS CREADOS
        case FILTER_BY_STATE:
            let stateFilteredPokemons =
                action.payload === "none"
                    ? [
                        ...state.allPokemons.filter((p) => {
                            return typeof p.id === "number";
                        })
                    ]
                    : [
                        ...state.allPokemons.filter((p) => {
                            return typeof p.id !== "number";
                        })
                    ];
            return {
                ...state,
                pokemons: [...stateFilteredPokemons]
            };

        //  DEFAULT
        default:
            return {
                ...state
            };
    };
};

export default rootReducer;