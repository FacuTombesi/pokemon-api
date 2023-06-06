const { Router } = require("express");
const { getTypesHandler } = require("../../controllers/handlers/typeHandlers");

const typeRouter = Router();

typeRouter.get("/", getTypesHandler);

module.exports = typeRouter;