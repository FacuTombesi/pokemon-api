const { getTypesApi } = require("../typeControllers");

const getTypesHandler = async (req, res) => {
    try {
        const types = await getTypesApi();
        res.status(201).json(types);
    }   catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { getTypesHandler };