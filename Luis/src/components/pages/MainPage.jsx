import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '../atoms/Button'

const MainPage = () => {

    const navigation = useNavigation()

    const login = () => {
        navigation.navigate('Login');
    }

    const register = () => {
        navigation.navigate('Register');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos a la AdoptBuddy</Text>
      <Text style={styles.textInfo}> ¿Ya tienes cuenta? </Text>
      <Button press={() => navigation.navigate("Login")} text={'Iniciar sesión'} />
      <Text style={styles.textInfo}> ¿Aún no tienes cuenta? </Text>
      {/* <TouchableOpacity onPress={() => register()} style={styles.button}>
        <Text style={styles.textButton}>Regístrate</Text>
      </TouchableOpacity> */}
      <Button press={() => navigation.navigate("Register", { mode: "create" })} text={'Registrarse'} />
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
    },
    textInfo: {
        fontSize: 20,
        marginTop: 10
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