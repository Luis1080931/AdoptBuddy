import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';
import TabNavigation from './TabNavigation';
import MainPage from '../pages/MainPage';
import UserForm from '../pages/UserForm';
import ProfileUser from '../pages/ProfileUser';
import ListPets from '../pages/ListPets';
import PagePetDetaills from '../pages/PagePetDetaills';
import MisMascotas from '../pages/MisMascotas';
import MisAdopciones from '../pages/MisAdopciones';
import MisSolicitudes from '../pages/MisSolicitudes';
import Solicitudes from '../pages/Solicitudes';
import SideBar from '../organims/Sidebar';
import IconMenu from '../atoms/IconMenu';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuPress = () => {
    setVisible(true);
  };

  return (
    <>
      <SideBar visible={visible} onClose={() => setVisible(false)} />
      <Stack.Navigator>
        <Stack.Screen 
          name='Bienvenido'
          component={TabNavigation}
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={handleMenuPress}>
                <IconMenu />
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='AdoptBuddy' component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={UserForm} />
        <Stack.Screen name='Profile' component={ProfileUser} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='Pets' component={ListPets} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='Pet' component={PagePetDetaills} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='MisPets' component={MisMascotas} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='MisAdopts' component={MisAdopciones} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='MisSoli' component={MisSolicitudes} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
        <Stack.Screen name='Solicitudes' component={Solicitudes} options={{ headerStyle: { backgroundColor: 'rgb(255, 165, 0)' } }} />
      </Stack.Navigator>
    </>
  );
}

export default Routes;
