import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableWithoutFeedback, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideBar = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-300));
  const [selectedButton, setSelectedButton] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {

    const fetchUser = async () => {
      const userValue = await AsyncStorage.getItem('user')
      if(userValue !== null){
        const response = JSON.parse(userValue)
        rolUser = response.rol
        idUser = response.id
      }
      /* console.log('User async', rolUser); */
    }
    fetchUser()
  }, [])

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
    onClose();
    setSelectedButton(screenName);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert("Cierre de Sesión", "Has cerrado sesión exitosamente.");
      navigation.navigate('Login');
      onClose();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "Hubo un problema al cerrar sesión. Intenta de nuevo.");
    }
  };

  const buttonStyle = (buttonName) => {
    return {
      ...styles.button,
      backgroundColor: selectedButton === buttonName ? '#E89551' : 'transparent',
    };
  };

  const textStyle = (buttonName) => {
    return {
      ...styles.buttonText,
      color: selectedButton === buttonName ? 'white' : 'black',
    };
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
              <View style={styles.imageContainer}>
                {/* <Image
                  source={icono}
                  style={styles.iconImage}
                /> */}
              </View>
              <View style={styles.divider} />
              {/* {userAuth.rol_user === 'admin' && ( */}
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('Profile')}
                >
                  {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                  <Text style={textStyle('PetsAdopt')}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('Pets')}
                >
                  {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                  <Text style={textStyle('PetsAdopt')}>Mascotas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('MisPets')}
                >
                  {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                  <Text style={textStyle('PetsAdopt')}>Mis mascotas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('MisAdopts')}
                >
                  {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                  <Text style={textStyle('PetsAdopt')}>Mis adopciones</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyle('PetsAdopt')}
                  onPress={() => handlePress('MisSoli')}
                >
                  {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                  <Text style={textStyle('PetsAdopt')}>Mis solicitudes</Text>
                </TouchableOpacity>
                {rolUser && rolUser === 'admin' ? (
                  <TouchableOpacity
                    style={buttonStyle('PetsAdopt')}
                    onPress={() => handlePress('Solicitudes')}
                  >
                    {/* <Image source={iconNoti} style={styles.buttonIcon} /> */}
                    <Text style={textStyle('PetsAdopt')}>Solicitudes</Text>
                  </TouchableOpacity>
                ) : ''}
               {/* )} */}
              <TouchableOpacity style={styles.button} onPress={handleLogout}>{/* 
                <Ionicons name="log-out-outline" size={24} color="black" style={styles.buttonIcon} /> */}
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: 310,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconImage: {
    width: 180,
    height: 180,
    margin: 10,
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 2,
  },
  buttonIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
});

export default SideBar;