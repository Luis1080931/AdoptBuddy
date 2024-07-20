import { Router } from "express";
import { registrarAdopcion, actualizarAdopcion,listarAdopciones, eliminarAdopcion, solicitudesUser, listarAdopcionesUser, listaSolicitudes, aceptarAdopcion } from "../controllers/adopciones.controller.js";

const routeAdopcion = Router();

routeAdopcion.post("/registrar", registrarAdopcion);
routeAdopcion.put("/actualizar/:id", actualizarAdopcion);
routeAdopcion.delete("/eliminar/:id", eliminarAdopcion);
routeAdopcion.get("/listar", listarAdopciones);
routeAdopcion.get("/listarSoli", listaSolicitudes);
routeAdopcion.get("/soliUser/:id", solicitudesUser);
routeAdopcion.get("/adoptsUser/:id", listarAdopcionesUser);
routeAdopcion.put("/acept/:id", aceptarAdopcion);

export default routeAdopcion