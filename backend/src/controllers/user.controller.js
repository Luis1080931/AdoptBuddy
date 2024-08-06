import { pool } from "../database/conexion.js";
import multer from 'multer'
import bcrypt from 'bcrypt'

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/users")
        },
        filename: function(req,file,cb){
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('image')

export const registrarUser = async (req, res) => {
    try {
        let image = req.file.originalname
        const { identificacion, nombre, correo, telefono, municipio, direccion, password } = req.body;
        const bcryptPassword = bcrypt.hashSync(password, 12)

        let sql = 'INSERT INTO usuarios (identificacion, nombre, imagen_user, correo, telefono, municipio, direccion, password, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 2)'

        const [rows] = await pool.query(sql, [identificacion, nombre, image, correo, telefono, municipio, direccion, bcryptPassword])

        if(rows.affectedRows>0){
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        }else{
            res.status(400).json({ message: 'Error al registrar el usuario' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })   
    }
}

export const actualizarUser = async (req, res) => {
    try {
        const { identificacion, nombre, correo, telefono,municipio, direccion, password } = req.body;
        let image = req.file ? req.file.originalname : null;
        const {id} = req.params

        const [anterior] = await pool.query(`SELECT * FROM usuarios WHERE id = ?`, [id])

        let sql = `
                UPDATE usuarios SET 
                identificacion = ?, 
                nombre = ?, 
                correo = ?, 
                telefono = ?, 
                municipio = ?,
                direccion = ?, 
                password = ?`

        const params = [identificacion || anterior[0].identificacion, nombre || anterior[0].nombre, correo || anterior[0].correo, telefono || anterior[0].telefono, municipio || anterior[0].municipio, direccion || anterior[0].direccion, password || anterior[0].password]

        if (image) {
            sql += `, imagen_user = ?`;
            params.push(image);
        }

        sql += ` WHERE id = ?`;
        params.push(id);

        const [rows] = await pool.query(sql, params)

        if(rows.affectedRows>0){
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        }else{
            res.status(400).json({ message: 'Error al actualizar el usuario' });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const listarUsuarios = async (req, res) => {
    try {
        let sql = `
                SELECT
                id,
                identificacion,
                nombre,
                imagen_user,
                correo,
                telefono,
                municipio,
                direccion 
            `

        const [result] = await pool.query(sql)

        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay usuarios registrados'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const buscarUsusario = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
                SELECT
                id,
                identificacion,
                nombre,
                imagen_user,
                correo,
                telefono,
                nombre_municipio,
                id_municipio AS municipio,
                direccion, 
                password

                FROM usuarios

                JOIN municipios ON municipio = id_municipio

                WHERE id = ?
            `

        const [result] = await pool.query(sql, [id])

        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: 'No hay usuarios registrados'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const listarMunicipios = async (req, res) => {
    try {
        let sql = `SELECT * FROM municipios`

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: 'No hay municipios registrados'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}