import { Router } from "express";
import { registrarMascota, actualizarMascota, eliminarMascota, listarMascotas, buscarMascota, adoptarMascota } from "../controllers/mascotas.controller.js";
import { cargarImage } from "../controllers/mascotas.controller.js";

const rutaMascotas = Router()

rutaMascotas.post('/registrar', cargarImage, registrarMascota)
rutaMascotas.put('/actualizar/:id', cargarImage, actualizarMascota)
rutaMascotas.put('/adoptar/:id', adoptarMascota)
rutaMascotas.delete('/eliminar/:id', eliminarMascota)
rutaMascotas.get('/listar', listarMascotas)
rutaMascotas.get('/buscar/:id', buscarMascota)

export default rutaMascotas