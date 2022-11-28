import { View, Text, TextInput, StyleSheet, Button, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import { getAuth, signInWithEmailAndPassword} from '../firebase/Config'

export default function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth,userName, password)
        .then((userCredential) => {
            //Firebase return user object but in this it is not used, but only logged to the console.
            console.log(userCredential.user)
            props.setLogin(true)
        }).catch ((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert("Invalid credentials!")
            } else if (error.code === 'auth/too-many-requests') {
                alert("Too many attemps, your account will be locked temporarily")
            } else {
                console.log(error.code)
                console.log(error.message)
            }
        })
    }

  return (
    <SafeAreaView style={styles.loginContainer}>
    <View >
      <Text style={styles.logHeading}>Login</Text>
      <Text style={styles.logField}>Username</Text>
      <TextInput style={styles.logField} placeholder="Type email here" 
        value={userName}
        onChangeText={text => setUserName(text)}
        keyboardType='email-address'
      />
      <Text style={styles.logField}>Password</Text>
      <TextInput style={styles.logField} placeholder="Type password here"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.logButton}>
        <Button title="Login" onPress={login}/>
      </View>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#fff',
      margin: 10
    },
    logHeading: {
        fontSize: 24,
        margin: 10,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    logField: {
        margin: 10,
        fontSize: 16
    },
    logButton: {
        marginTop: 30,
    },
})