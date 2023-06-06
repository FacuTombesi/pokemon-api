const { Router } = require("express");
const { 
    getPokemonsHandler,
    getPokemonByIdHandler,
    createPokemonHandler
} = require("../../controllers/handlers/pokemonHandlers");

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonsHandler);

pokemonRouter.get("/:id", getPokemonByIdHandler);

pokemonRouter.post("/create", createPokemonHandler)

module.exports = pokemonRouter;