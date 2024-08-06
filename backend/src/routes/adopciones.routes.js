import { Router } from "express";
import { registrarAdopcion, actualizarAdopcion,listarAdopciones, eliminarAdopcion, solicitudesUser, listarAdopcionesUser, listaSolicitudes, aceptarAdopcion } from "../controllers/adopciones.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeAdopcion = Router();

routeAdopcion.post("/registrar",validarToken, registrarAdopcion);
routeAdopcion.put("/actualizar/:id", validarToken, actualizarAdopcion);
routeAdopcion.delete("/eliminar/:id",validarToken, eliminarAdopcion);
routeAdopcion.get("/listar", validarToken,listarAdopciones);
routeAdopcion.get("/listarSoli", validarToken,listaSolicitudes);
routeAdopcion.get("/soliUser/:id",validarToken, solicitudesUser);
routeAdopcion.get("/adoptsUser/:id",validarToken, listarAdopcionesUser);
routeAdopcion.put("/acept/:id",validarToken, aceptarAdopcion);

export default routeAdopcion