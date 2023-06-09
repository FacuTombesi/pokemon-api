const { Type } = require("../db");
const axios = require("axios");

// URLs de la api
const typeApiUrl = "https://pokeapi.co/api/v2/type";

const getAllTypes = async () => {
    const response = await axios.get(typeApiUrl);
    const types = response.data.results;
    const typesNames = [];
    for (let type of types) {
        let findType = await Type.findOne({ where: { name: type.name } }); // Busco si ya tengo el tipo de pokemon para evitar duplicarlo
        if (findType) {
            typesNames.push(findType); // Si lo encuentro, lo pusheo a mi nuevo array
        }   else {
            const newType = await Type.create({ // De lo contrario, creo un nuevo tipo y lo pusheo
                name: type.name
            });
            typesNames.push(newType);
        }
    }
    return typesNames;
};

module.exports = {
    getAllTypes
};