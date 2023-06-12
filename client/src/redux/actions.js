import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SELECT_POKEMONS = "SELECT_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMONDETAIL";
export const GET_POKEMON_BY_NAME = "GET_POKEMONBYNAME";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BYTYPE";
export const FILTER_BY_STATE = "FILTER_BYSTATE";
export const CLEAR = "CLEAR";

export const getPokemons = () => {
    return async (dispatch) => {
        try {
            const pokemonsData = await axios.get("http://localhost:3001/pokemons"); // get a mi localhost en mi back
            const allPokemons = pokemonsData.data; // Guardo toda la info
            return dispatch({
                type: GET_POKEMONS, // Defino el tipo de payload para pasarselo al reducer
                payload: allPokemons // Y le paso como payload la info que me traje del back
            });
        }   catch (error) {
            console.error("Error conecting to Database");
        }
    };
};

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            let pokemonDetail = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: GET_POKEMON_DETAIL,
                payload: pokemonDetail
            });
        }   catch (error) {
            console.error(`Pokémon with the ID: ${name} not found`);
        }
    };
};

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {
            let pokemonByName = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: pokemonByName
            });
        }   catch (error) {
            console.error(`There are no Pokémons with the name: ${name}`);
        }
    };
};

export const orderPokemons = (payload) => {
    return {
        type: ORDER_POKEMONS,
        payload: payload
    };
};

export const orderByName = (payload) => {
    return {
        type: GET_POKEMON_BY_NAME,
        payload: payload
    };
};

export const createPokemon = (payload) => {
    return async (dispatch) => {
        try {
            const newPokemon = await axios.get("http://localhost:3001/pokemons/create", payload);
            return dispatch({
                type: CREATE_POKEMON,
                payload: newPokemon.data
            });
        }   catch (error) {
            console.log(error);
        }
    };
};

export const getTypes = () => {
    return async (dispatch) => {
        try {
            let allTypes = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: GET_TYPES,
                payload: allTypes
            });
        }   catch (error) {
            console.error("Error conecting to Database");
        }
    };
};

export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPE,
        payload: payload
    };
};

export const filterByState = (payload) => {
    return {
        type: FILTER_BY_STATE,
        payload: payload
    };
};

export const clear = () => {
    return {
        type: CLEAR
    };
};