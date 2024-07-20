import {pool} from './../database/conexion.js'

export const registrarAdopcion = async (req, res) => {
    try {
        const { persona, mascota} = req.body

        let sql = 'INSERT INTO adoptar ( persona, mascota, estado) VALUES (?, ?, 1)'

        const [rows] = await pool.query(sql, [persona, mascota])

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
        const { persona, mascota} = req.body
        const {id} = req.params

        let sql = 'UPDATE adoptar SET persona=IFNULL(?, persona), mascota=IFNULL(?, mascota) WHERE id = ?'

        const [rows] = await pool.query(sql, [persona, mascota, id])

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
                u.* AS persona, 
                m.* AS mascota
                a.estado
                
                FROM adoptar a

                JOIN 
                    usuarios u ON a.persona = u.identificacion
                JOIN 
                    mascotas m ON a.mascota = m.id_mascota 

                WHERE estado = 2
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

export const solicitudesUser = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
                SELECT 
                u.*, 
                m.*,
                a.estado
                
                FROM adoptar a

                JOIN 
                    usuarios u ON a.persona = u.id
                JOIN 
                    mascotas m ON a.mascota = m.id_mascota 

                WHERE a.estado = 1 AND persona = ?
        `

        const [result] = await pool.query(sql, [id])
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay solicitudes registradas'
            })
        }
            
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const listarAdopcionesUser = async(req, res) => {
    try {
        const {id} = req.params
        let sql = `
                SELECT 
                u.*, 
                m.*,
                a.estado
                
                FROM adoptar a

                JOIN 
                    usuarios u ON a.persona = u.id
                JOIN 
                    mascotas m ON a.mascota = m.id_mascota 

                WHERE a.estado = 2 AND persona = ?
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

export const listaSolicitudes = async (req, res) => {
    try {
        let sql = `
                SELECT 
                u.*, 
                m.*,
                a.*
                
                FROM adoptar a

                JOIN 
                    usuarios u ON a.persona = u.id
                JOIN 
                    mascotas m ON a.mascota = m.id_mascota 

                WHERE a.estado = 1
        `

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay solicitudes registradas'
            })
        }
            
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const aceptarAdopcion = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `UPDATE adoptar SET estado = 2 WHERE id = ?`

        const [rows] = await pool.query(sql, [id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message: 'Adopción aceptada'
            })
        }else{
            res.status(403).json({
                message: 'No fue posible aceptar la adopción'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}