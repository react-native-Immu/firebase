import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, onSnapshot, orderBy, query } from './firebase/Config'
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Functions'
import Login from './components/Login';


export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        // Create and format message object based on data retrieved from database.
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })
  
    return () => {
      unsubscribe()
    }
  }, [])
  

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setNewMessage('') //Empties the texinput after saving message
    console.log('Message saved.')
  }

  const logout = () => {
    setLogged(false)
  }

  if (logged) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) =>(
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
        <View style={styles.test}>
          <TextInput
            style={styles.input} 
            placeholder='Enter new message here'
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
            />
          <Button title="Save" onPress={save}/>
        </View>
        <View style={styles.logout}>
          <Button title="Logout" onPress={logout}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} else {
  return <Login setLogin={setLogged}/>
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    margin: 10
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    
  },
  messageInfo: {
    fontSize: 12
  },
  input: {
    marginTop: 30,
    marginBottom: 30,
    margin: 10,
    fontSize: 15,
    marginRight: 60
  },
  test: {
    flex: 1,
  },
  logout: {
    marginTop: 40,
  }
});
