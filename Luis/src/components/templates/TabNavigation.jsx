import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconHome from '../atoms/IconHome';
import IconMenu from '../atoms/IconMenu';
import IconProfile from '../atoms/IconProfile';
import ListPets from '../pages/ListPets';
import ProfileUser from '../pages/ProfileUser';
import SideBar from '../organims/Sidebar';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuPress = () => {
    setVisible(true);
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Menu"
          component={() => null} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity onPress={handleMenuPress}>
                <IconMenu color={color} size={size} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Pets"
          component={ListPets}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <IconHome color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileUser}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <IconProfile color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <SideBar visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default TabNavigation;
