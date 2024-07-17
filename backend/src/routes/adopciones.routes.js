import { Router } from "express";
import { registrarAdopcion, actualizarAdopcion,listarAdopciones, eliminarAdopcion } from "../controllers/adopciones.controller.js";

const routeAdopcion = Router();

routeAdopcion.post("/registrar", registrarAdopcion);
routeAdopcion.put("/actualizar/:id", actualizarAdopcion);
routeAdopcion.delete("/eliminar/:id", eliminarAdopcion);
routeAdopcion.get("/listar/:id", listarAdopciones);

export default routeAdopcion