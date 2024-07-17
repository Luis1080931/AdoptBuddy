import { pool } from "../database/conexion.js";

export const listarGeneros = async(req, res) => {
    try {
        let sql = `SELECT * FROM genero`

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(201).json(result)
        }else{
            res.status(404).json({
                message: 'No hay generos registrados'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor'+ error
        })
    }
}

export const listarCategorias = async(req, res) =>{
    try {
        let sql = `SELECT * FROM categoria`

        const [result] = await pool.query(sql)
        if(result.length>0){
            res.status(201).json(result)
        }else{
            res.status(404).json({
                message: 'No hay categorias registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}