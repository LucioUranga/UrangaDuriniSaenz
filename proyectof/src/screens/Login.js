import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../firebase/config';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      loggedIn: false,
      error: ''
    };
  }

  onSubmit(email, pass) {
    if (!email.includes('@')) {
      console.log('email mal formateado');
      this.setState({ error: 'email mal formateado' });
    }
    else if (pass.length < 6) {
      console.log('La password debe tener una longitud mínima de 6 caracteres');
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
    }
    
    auth.signInWithEmailAndPassword(email, pass)

      .then(response => {
        this.setState({ loggedIn: true });
      })
      .then(() => { this.props.navigation.navigate('HomeMenu') })

      .catch(error => { this.setState({ error: "credenciales invalidas" }) })
  }

  render() {
    return (
      <View>
        <Text>Login</Text>

        <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')}>
          <Text>Go to Home Menu</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Register')}>
          <Text>Go to Register</Text>
        </Pressable>

        <View style={styles.container}>
          <Text>Register</Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />

          <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    paddingVertical: 10,
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

export default Login;
