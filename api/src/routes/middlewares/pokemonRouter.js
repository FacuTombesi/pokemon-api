const { Router } = require("express");
const { 
    getPokemonHandler,
    getPokemonByIdHandler,
    createPokemonHandler
} = require("../../controllers/handlers/pokemonHandlers");

const pokemonRouter = Router();

pokemonRouter.get("/", getPokemonHandler);

pokemonRouter.get("/:id", getPokemonByIdHandler);

pokemonRouter.post("/create", createPokemonHandler);

module.exports = pokemonRouter;