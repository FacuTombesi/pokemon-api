const { getAllTypes } = require("../typeControllers");

const getTypesHandler = async (req, res) => {
    try {
        const types = await getAllTypes();
        res.status(201).json(types);
    }   catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { getTypesHandler };