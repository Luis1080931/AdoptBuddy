import React, { createContext, useState } from 'react'
import axiosClient from '../components/services/axiosClient'
import { Alert } from 'react-native'

const AuthContext = createContext() 

export const AuthProvider = ({children}) => {

    const [rol, setRol] = useState('')
    const [idUser, setIdUser] = useState([])
    const [estadoModal, setEstadoModal] = useState(false) 

    const updatePet = (idPet, data) => {
      try {
        axiosClient.put(`/mascotas/actualizar/${idPet}`, data)
        Alert.alert('Mascota actualizada con éxito')
        setEstadoModal(false)
      
      } catch (error) {
        console.log('Error del servidor para actualizar'+ error);
      }
    }

  return (
    <AuthContext.Provider 
    value={{
        rol,
        setRol,
        estadoModal, 
        setEstadoModal,
        updatePet,
        idUser, 
        setIdUser
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
