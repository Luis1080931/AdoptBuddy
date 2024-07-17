import {pool} from './../database/conexion.js'

export const registrarAdopcion = async (req, res) => {
    try {
        const {fecha, persona, mascota, motivo} = req.body

        let sql = 'INSERT INTO adoptar (fecha, persona, mascota, motivo) VALUES (?, ?, ?, ?)'

        const [rows] = await pool.query(sql, [fecha, persona, mascota, motivo])

        if(rows.affectedRows>0){
            res.status(200).json({message: 'Adopción registrada exitosamente'})
        }else{
            res.status(403).json({message: 'Error al registrar adopción'})
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor', error
        })
    }
}

export const actualizarAdopcion = async (req, res) => {
    try {
        const {fecha, persona, mascota, motivo} = req.body
        const {id} = req.params

        let sql = 'UPDATE adoptar SET fecha=IFNULL(?, fecha), persona=IFNULL(?, persona), mascota=IFNULL(?, mascota), motivo=IFNULL(?, motivo) WHERE id = ?'

        const [rows] = await pool.query(sql, [fecha, persona, mascota, motivo, id])

        if(rows.affectedRows>0){
            res.status(200).json({message: 'Adopción actualizada exitosamente'})
        }else{
            res.status(403).json({message: 'Error al actualizar adopción'})
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor', error
        })
    }
}

export const listarAdopciones = async(req, res) => {
    try {
        const {id} = req.params
        let sql = `
                SELECT 
                a.fecha,
                u.nombre AS persona, 
                m.nombre_mascota AS mascota
                
                FROM adoptar a

                JOIN 
                    usuarios u ON a.persona = u.identificacion
                JOIN 
                    mascotas m ON a.mascota = m.id_mascota 

                WHERE persona = ?
        `

        const [result] = await pool.query(sql, [id])
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay adopciones'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor', error
        })
    }
}

export const eliminarAdopcion = async(req, res) => {
    try {
        const {id} = req.params
        let sql = `DELETE FROM adoptar WHERE id = ?`

        const [rows] = await pool.query(sql, [id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message: 'Se elimino con exito la adopcion'
            })
        }else{
            res.status(403).json({
                message: 'No fue posible eliminar la adopcion'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor', error
        })
    }
}