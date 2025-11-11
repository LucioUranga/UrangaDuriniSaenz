import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      likes: [],
      comentarios: []
    };
  }


  handlePost() {
    const user = auth.currentUser;

    if (!user) {
      this.setState({ error: 'Debes estar logueado para crear un post' });
      return;
    }


    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: []
      })
      .then(() => {
        this.setState({
          description: ''
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: 'Error al publicar el post' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear nuevo post</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe aquí tu post..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />

        <Pressable style={styles.button} onPress={() => this.handlePost()}>
          <Text style={styles.buttonText}>Publicar post</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a1c4fd',
    backgroundGradient: 'linear-gradient(180deg, #a1c4fd 0%, #c2e9fb 100%)',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#212529',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});


export default NewPost

