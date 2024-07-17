import { Router } from "express";
import { listarGeneros, listarCategorias } from "../controllers/utils.controller.js";

const routeUtils = Router();

routeUtils.get('/generos', listarGeneros)
routeUtils.get('/categorias', listarCategorias)

export default routeUtils