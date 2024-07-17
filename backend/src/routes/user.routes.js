import { Router } from "express";
import { registrarUser, actualizarUser, listarMunicipios } from "../controllers/user.controller.js";
import { validar } from "../controllers/seguridad.controller.js";
import { cargarImage } from "../controllers/user.controller.js";

const rutaUser = Router()

rutaUser.post('/registrar', cargarImage, registrarUser)
rutaUser.post('/validar', validar)
rutaUser.put('/actualizar/:id',cargarImage, actualizarUser)
rutaUser.get('/muni', listarMunicipios)

export default rutaUser