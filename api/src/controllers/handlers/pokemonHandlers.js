const {
    getAllPokemon,
    findById,
    createPokemon
} = require("../pokemonControllers");

const getPokemonHandler = async (req, res) => {
    const { name } = req.query;
    const allPokemon = await getAllPokemon();
    try {
        !name 
            ? res.status(200).json(allPokemon) 
            : findByName = allPokemon.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        !findByName[0] 
            ? res.status(404).json(`The are no Pokémons with the name: ${name} registered in the Pokédex`) 
            : res.status(200).json(findByName);
    }   catch (error) {
        res.status(404).send("The Pokédex is empty");
    }
};

const getPokemonByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        let pokemonById = await findById(id);
        res.status(200).json(pokemonById);
    }   catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const createPokemonHandler = async (req, res) => {
    const {
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
    } = req.body;
    try {
        const newPokemon = await createPokemon(
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
        );
        res.status(200).send(`${name} added to the Pokédex`);
        return newPokemon;
    }   catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPokemonHandler,
    getPokemonByIdHandler,
    createPokemonHandler
};