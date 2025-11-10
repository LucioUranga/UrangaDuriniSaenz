import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-web'
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

export class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      userName: '',
      password: '',
      registered: false,
      error: ''
    }
  }

  onSubmit(email, pass, userName) {
    auth.createUserWithEmailAndPassword(email, pass)
      .then(response => {
        this.setState({ registered: true });

        db.collection('users').add({
          email: email,
          userName: userName,
          createdAt: Date.now()
        })
      })

      .then(() => {this.props.navigation.navigate('Login')})



      .catch(error => { this.setState({ error: "fallo en el registro" }); console.log(error);
      })
  }

  render() {
    return (
      <View>
        <Text>Register</Text>
        <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')}>
          <Text>Go to Home Menu</Text>
        </Pressable>
        <Pressable onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Go to Login</Text>
        </Pressable>
        <View style={styles.container}>
          <Text>Register</Text>
          <TextInput style={styles.input}
            keyboardType='email-address'
            placeholder='Email'
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email} />
          <TextInput style={styles.input}
            keyboardType='default'
            placeholder='UserName'
            onChangeText={(text) => this.setState({ userName: text })}
            value={this.state.userName} />
          <TextInput style={styles.input}
            keyboardType='password'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}

            value={this.state.password} />
          <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.userName)}>
            <Text style={styles.buttonText}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
  },

  buttonText: {
    color: '#fff',
  },
});



export default Register


