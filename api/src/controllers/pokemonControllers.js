const { Pokemon, Type } = require("../db");
const axios = require("axios");

// URLs de la api
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

// ------------------------ GET POKEMONS ------------------------

const getPokemonApi = async () => {
    const apiUrl = await axios.get(pokemonApiUrl);
    const pokeFromApi = []; // Guardo en un array la URL de cada pokemon con su info
    apiUrl.data.results.forEach((p) => {
        pokeFromApi.push(
            axios.get(p.url)
            .then((res) => res.data)
        );
    });
    const apiPokeInfo = Promise.all(pokeFromApi) // Promise.all espera que todas las promesas se cumplan para seguir con el mapeo
        .then((response) => 
            response.map((poke) => { // Mapeo cada pokemon para sacar la info que necesito de cada uno
                return {
                    id: poke.id,
                    name: poke.name,
                    image: poke.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default,
                    hp: poke.stats[0].base_stat,
                    attack: poke.stats[1].base_stat,
                    defense: poke.stats[2].base_stat,
                    spAttack: poke.stats[3].base_stat,
                    spDefense: poke.stats[4].base_stat,
                    speed: poke.stats[5].base_stat,
                    height: poke.height,
                    weight: poke.weight,
                    type: poke.types.map((t) => t.type.name),
                }; // Devuelvo toda la info de cada pokemon
            })
        );
    return await apiPokeInfo; // Espero que la termine de recopilar la info y la devuelvo
};

const getPokemonDb = async () => {
    const pokeFromDb = await Pokemon.findAll();
    return pokeFromDb;
};

const getAllPokemon = async () => {
    const pokemonDb = await getPokemonDb();
    const pokemonApi = await getPokemonApi();
    const allPokemon = pokemonApi.concat(pokemonDb);
    return allPokemon;
};

// ------------------------ GET BY ID ------------------------

const findById = async (id) => {
    const allPokemon = await getAllPokemon();
    const pokemonById = allPokemon.filter((p) => p.id == id);
    if (pokemonById) return pokemonById;
    else throw Error(`No Pokémon with the ID: ${id} registered in the Pokédex`);
};

// ------------------------ POST POKEMON ------------------------

const createPokemon = async (
    name,
    image,
    hp,
    attack,
    defense,
    spAttack,
    spDefense,
    speed,
    height,
    weight,
    type
) => {
    if (!name || !image || !hp || !attack || !defense || !spAttack || !spDefense) throw Error ("Missing important information")
    const newPokemon = await Pokemon.create({
        name,
        image,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed,
        height,
        weight
    });
    const typeFromDb = await Type.findAll({ where: { name: type } });
    newPokemon.addTypes(typeFromDb);
    return newPokemon;
};

module.exports = {
    getPokemonApi,
    getPokemonDb,
    getAllPokemon,
    findById,
    createPokemon
};