import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
/* import NetInfo from '@react-native-community/netinfo' */

const Login = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

 /*  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state =>{
      console.log('Tipo de conexion', state.type);
      console.log('Is conected??', state.isConnected);
      if (!state.isConnected) {
        Alert.alert('Sin conexion ', 'Por favor,  verifica tu conexion a internet.')
    }
    }) 
    return()=>{
      unsubscribe();
    }
    
  },[]) */
    
  
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () =>{
    /* const connectionInfo = await NetInfo.fetch()
    if (!connectionInfo.isConnected) {
      Alert.alert('Sin conexion ', 'Porfavor, verifica ti conexion a internet')
      return
    }
    console.log(formData) */
    try {
      const baseURL = `http://10.0.2.2:3000/users/validar`;

      const response = await axios.post(baseURL, formData)
      
        if(response.status === 200){
            navigation.navigate('Bienvenido');
            Alert.alert('Bienvenido');
          }
          
      console.log('Info', response.data);
      console.log(response.status);

      
        const { token } = response.data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user[0]));

        /* const storedUser = await AsyncStorage.getItem('user')
        const user = JSON.parse(storedUser)
        const userRol= user.tipo_usuario.toLowerCase()
        const userStatus = user.estado
        console.log(userStatus);
        console.log(userRol) */
        
        const tokenAsyng = await AsyncStorage.getItem('token')



        /* if (userRol == 'catador' && userStatus=='activo') {
          navigation.navigate("ListarUsuarios");
          console.log(tokenAsyng)
          Alert.alert('Bienvenido Catador');
        }else if (userRol === 'caficultor' && userStatus=='activo'){
          navigation.navigate("vista1");
          console.log(tokenAsyng)
          Alert.alert('Bienvenido Caficultor');
        }else{
          if (userRol=='catador'&&userStatus=='inactivo' || userRol=='caficultor'&&userStatus=='inactivo') {
            Alert.alert("Lo sentimor pero no esta activo en el sistema. ");
          }else{
            Alert.alert("Sus datos son erroneos ");
          }

        } */
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Usuario no registrado');
      } else {
        console.error(error);
        Alert.alert('Error del servidor ',error);
      }
    }
  }

  return (
    <>
    {/* <ImageBackground
        style={styles.background}
      > */}
      <View style={styles.container}>
        <Text style={styles.titulo}> ¡Haz parte de esta bonita familia ! </Text>
        <Image 
          style={{ width: 300, height: 300 }}
          source={require('./../../../assets/logoIA.png')}
        />
        
        <View>
          <Text style={styles.titulo}>INICIAR SESION </Text>
          <TextInput style={styles.input} placeholderTextColor="#000"  value={formData.correo} onChangeText={(text) => handleInputChange('correo', text)} placeholder='Correo'/>
          <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholderTextColor="#000"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholder="Contraseña"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Image
              style={styles.eyeIcon}
              source={secureTextEntry ? require('./../../../assets/cerrar-ojo.png') : require('./../../../assets/ojo.png')}
            />
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.textoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <TouchableOpacity>
            <Text style={styles.textoBoton}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      {/* </ImageBackground> */}
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },

  input: {
    height: 40,
    width:300,
    backgroundColor: 'rgb(255, 215, 100)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  boton: {
    backgroundColor: 'rgb(255, 165, 0)',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
    height:40
  },
  textoBoton: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagen: {
    marginBottom: 10,
    height: 230,
    width: 230,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgb(255, 215, 100)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    
  },
  
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default Login;