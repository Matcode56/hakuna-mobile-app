import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Projects from './screens/Projects'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
})

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerBackVisible: false }}></Stack.Screen>
          <Stack.Screen name='Projects' component={Projects} options={{ headerBackVisible: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}

AppRegistry.registerComponent('MyApplication', () => App)
