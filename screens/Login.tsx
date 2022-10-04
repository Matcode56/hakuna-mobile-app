import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { ObjectStorage } from '../interfaces/ObjectStorage'
import { LoginGQL } from '../services/mutations'

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [getTokenAndUser, { data }] = useMutation<any>(LoginGQL, {
    onCompleted: async data => {
      await storeData()
    },
    onError(error) {
      console.log(error)
    },
  })

  useEffect(() => {}, [])

  const storeData = async () => {
    const token: string = data['login']['token']
    const idUser: string = data['login']['user']['id']
    const objectToStorage: ObjectStorage = { token, idUser }
    const objectJSON: string = JSON.stringify(objectToStorage)
    try {
      await AsyncStorage.setItem('@storage_Key', objectJSON)
      navigation.navigate('Projects')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.containeur}>
      <LinearGradient
        style={styles.formLogin}
        colors={['rgba(129,136,254,0.1)', 'rgba(129,136,254,0.5)', 'rgba(129,136,254,0.75)', 'rgba(129,136,254,1)']}
      >
        <Image source={require('../assets/icons/HakunaLogo.png')} style={styles.logo} />

        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          placeholder={'Email'}
          style={styles.input}
          autoCapitalize='none'
        />
        <TextInput
          autoCapitalize='none'
          value={password}
          onChangeText={password => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Connexion'}
          onPress={() => getTokenAndUser({ variables: { email: email, password: password } })}
          buttonStyle={styles.button}
        />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  containeur: {
    alignItems: 'center',
  },
  formLogin: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    paddingVertical: 40,
    marginTop: 10,
    borderRadius: 10,
    width: 310,
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 95,
    resizeMode: 'contain',
    marginBottom: 35,
  },
  input: {
    width: 250,
    marginBottom: 25,
    padding: 7,
    backgroundColor: '#FFFDFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 6,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  button: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'rgba(1,12,216,0.7)',
  },
})
export default Login
