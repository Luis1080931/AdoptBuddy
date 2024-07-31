import { Router } from "express";
import { registrarMascota, actualizarMascota, eliminarMascota, listarMascotas, buscarMascota, adoptarMascota, mascotasUser, solicitarMascota, disponibleMascota, listarMascotasHistorial } from "../controllers/mascotas.controller.js";
import { cargarImage } from "../controllers/mascotas.controller.js";

const rutaMascotas = Router()

rutaMascotas.post('/registrar', cargarImage, registrarMascota)
rutaMascotas.put('/actualizar/:id', cargarImage, actualizarMascota)
rutaMascotas.put('/adoptar/:id', adoptarMascota)
rutaMascotas.put('/cancel/:id', disponibleMascota)
rutaMascotas.put('/solicitar/:id', solicitarMascota)
rutaMascotas.delete('/eliminar/:id', eliminarMascota)
rutaMascotas.get('/listar', listarMascotas)
rutaMascotas.get('/listarHistorial', listarMascotasHistorial)
rutaMascotas.get('/buscar/:id', buscarMascota)
rutaMascotas.get('/petUser/:id', mascotasUser)

export default rutaMascotas