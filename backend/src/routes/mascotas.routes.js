import { Router } from "express";
import { registrarMascota, actualizarMascota, eliminarMascota, listarMascotas, buscarMascota, adoptarMascota, mascotasUser, solicitarMascota, disponibleMascota, listarMascotasHistorial } from "../controllers/mascotas.controller.js";
import { cargarImage } from "../controllers/mascotas.controller.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const rutaMascotas = Router()

rutaMascotas.post('/registrar', validarToken, cargarImage, registrarMascota)
rutaMascotas.put('/actualizar/:id', validarToken,cargarImage, actualizarMascota)
rutaMascotas.put('/adoptar/:id',validarToken, adoptarMascota)
rutaMascotas.put('/cancel/:id', validarToken,disponibleMascota)
rutaMascotas.put('/solicitar/:id',validarToken, solicitarMascota)
rutaMascotas.delete('/eliminar/:id',validarToken, eliminarMascota)
rutaMascotas.get('/listar',validarToken, listarMascotas)
rutaMascotas.get('/listarHistorial', validarToken,listarMascotasHistorial)
rutaMascotas.get('/buscar/:id',validarToken, buscarMascota)
rutaMascotas.get('/petUser/:id',validarToken, mascotasUser)

export default rutaMascotas