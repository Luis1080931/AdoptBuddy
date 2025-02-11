import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '../atoms/Button'
import ModalUsuario from '../modals/ModalUser'

const MainPage = () => {

    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false)
    const [userData, setUserData] = useState(null)
    const [userId, setUserId] = useState(null)
    const [title, setTitle] = useState('')

    const login = () => {
        navigation.navigate('Login');
    }

    const register = () => {
        navigation.navigate('Register');
    }

    const vista = (accion, userData, userId) => {
      setTitle(accion)
      setModalOpen(!modalOpen)
      setUserData(userData)
      setUserId(userId)
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos a AdoptBuddy</Text>
      <Image 
        style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 100 }}
        source={require('./../../../assets/logoIA.png')}
      />
      <Text style={styles.textInfo}> ¿Ya tienes cuenta? </Text>
      <Button press={() => navigation.navigate("Login")} text={'Iniciar sesión'} />
      <Text style={styles.textInfo}> ¿Aún no tienes cuenta? </Text>
      
      <Button press={() => vista('Registrar')} text={'Registrarse'} />

      <ModalUsuario 
        visible={modalOpen}
        onClose={vista}
        title={title}
        userData={userData}
        userId={userId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    textInfo: {
        fontSize: 20,
        marginTop: 10,
        color: 'black'
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: 150,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default MainPage