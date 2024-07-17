import { View, Text } from 'react-native'
import React from 'react'
import Routes from './src/components/templates/Routes.jsx'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './src/components/templates/TabNavigation.jsx'

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  )
}

export default App