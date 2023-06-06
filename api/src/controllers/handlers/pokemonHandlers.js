const {
    getAllPokemon,
    findById,
    createPokemon
} = require("../pokemonControllers");

const getPokemonHandler = async (req, res) => {
    const { name } = req.query;
    const allPokemon = await getAllPokemon();
    try {
        if (!name) return res.status(200).json(allPokemon);
        const findByName = allPokemon.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        if (!findByName[0]) return res.status(200).json(`The are no Pokémons with the name: ${name} registered in the Pokédex`);
        return res.status(200).json(findByName);
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
        type,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed,
        height,
        weight
    } = req.body;
    try {
        const newPokemon = await createPokemon(
            name,
            image,
            type,
            hp,
            attack,
            defense,
            spAttack,
            spDefense,
            speed,
            height,
            weight
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