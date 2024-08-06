import { Router } from "express";
import { listarGeneros, listarCategorias } from "../controllers/utils.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeUtils = Router();

routeUtils.get('/generos', validarToken, listarGeneros)
routeUtils.get('/categorias',validarToken, listarCategorias)

export default routeUtils