import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import rutaUser from './src/routes/user.routes.js'
import routeAdopcion from './src/routes/adopciones.routes.js'
import rutaMascotas from './src/routes/mascotas.routes.js'
import routeUtils from './src/routes/utils.routes.js'

const servidor = express()

servidor.use(cors())

servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended: false}))

servidor.use('/users', rutaUser)
servidor.use('/adopciones', routeAdopcion)
servidor.use('/mascotas', rutaMascotas)
servidor.use('/utils', routeUtils)

servidor.use(express.static('./public'))

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

