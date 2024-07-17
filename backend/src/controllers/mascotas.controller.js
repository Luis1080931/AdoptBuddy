import {pool} from './../database/conexion.js'
import multer from 'multer'

const storage = multer.diskStorage(
    {
        destination: function(req,file,cb){
            cb(null, "public/img")
        },
        filename: function(req,file,cb){
            cb(null, file.originalname)
        }
    }
)

const upload = multer({storage: storage})
export const cargarImage = upload.single('image')

export const registrarMascota = async (req, res) => {
    try {
        
        const {nombre, genero, categoria, esteril, vacunas, habitos, edad, dueno} = req.body
        let image = req.file.originalname
        
        let sql = 'INSERT INTO mascotas (nombre_mascota, imagen, fk_genero, fk_categoria, esteril, vacunas, habitos, edad, fk_dueno, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 2)'

        const [rows] = await pool.query(sql, [nombre, image, genero, categoria, esteril, vacunas, habitos, edad, dueno])

        if(rows.affectedRows>0){
            res.json({message: 'Mascota registrada exitosamente'})
        }else{
            res.status(403).json({message: 'Error al registrar mascota'})
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const actualizarMascota = async (req, res) => {
    try {
        
        const {nombre, genero, categoria, esteril, vacunas, habitos, edad, estado} = req.body
        let image = req.file ? req.file.originalname : null;
        const {id} = req.params
        const [anterior] = await pool.query(`SELECT * FROM mascotas WHERE id_mascota = ?`, [id])
        
        let sql = `
            UPDATE mascotas SET 
            nombre_mascota = ?,
            genero = ?, 
            categoria = ?, 
            esteril = ?, 
            vacunas = ?, 
            habitos = ?, 
            edad = ?, 
            estado = ? 
        `

        const params =  [nombre || anterior[0].nombre, genero || anterior[0].genero, categoria || anterior[0].categoria, esteril || anterior[0].esteril, vacunas || anterior[0].vacunas, habitos || anterior[0].habitos, edad || anterior[0].edad, estado || anterior[0].estado]

        if (image) {
            sql += `, image = ?`;
            params.push(image);
        }

        sql += ` WHERE id_mascota = ?`;
        params.push(id);


        const [rows] = await pool.query(sql, params)

        if(rows.affectedRows>0){
            res.json({message: 'Mascota actualizada exitosamente'})
        }else{
            res.status(403).json({message: 'Error al actualizar mascota'})
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const eliminarMascota = async (req, res) => {
    try {
        const {id} = req.params
        let sql = 'DELETE FROM mascotas WHERE id_mascota = ?'

        const [result] = await pool.query(sql, [id])

        if(result.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se elimino con exito la mascota'
            })
        }else{
            res.status(403).json({
                status: 403,
                message:'No se pudo eliminar la mascota'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor', error
        })
    }
}

export const listarMascotas = async(req, res) => {
    try {
        let sql = `
            SELECT 
            m.id_mascota,
            m.nombre_mascota,
            m.imagen, 
            g.nombre_genero AS genero,
            c.nombre_categoria AS categoria,
            m.esteril,
            m.vacunas, 
            m.habitos, 
            m.edad, 
            m.estado

            FROM mascotas m

            JOIN 
                genero g ON m.fk_genero = g.id
            JOIN 
                categoria c ON m.fk_categoria = c.id

            WHERE estado = 2
        `

        const [result] = await pool.query(sql)

        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay mascotas registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor', error
        })
    }
}

export const buscarMascota = async(req, res) => {
    try {
        const {id} = req.params
        let sql = `
            SELECT 
            m.id_mascota,
            m.nombre_mascota,
            m.imagen, 
            g.nombre_genero AS genero,
            c.nombre_categoria AS categoria,
            m.esteril,
            m.vacunas, 
            m.habitos, 
            m.edad, 
            u.nombre AS dueno,
            m.estado

            FROM mascotas m

            JOIN 
                genero g ON m.fk_genero = g.id
            JOIN 
                categoria c ON m.fk_categoria = c.id
            JOIN 
                usuarios u ON m.fk_dueno = u.id

            WHERE id_mascota = ?
        `

        const [result] = await pool.query(sql, [id])
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay mascotas registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor', error
        })
    }
}

export const adoptarMascota = async(req, res) => {
    try {
        const {id} = req.params
        let sql = 'UPDATE mascotas SET estado = 1 WHERE id_mascota = ?'

        const [result] = await pool.query(sql, [id])

        if(result.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se actualizo el estado con exito'
            })
        }else{
            res.status(403).json({
                status: 200,
                message: 'Error al actualizar el estado'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor', error
        })
    }
}