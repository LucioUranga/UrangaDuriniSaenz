import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: '',
      success: ''
    };
  }


  handlePost() {
    const { description } = this.state;
    const user = auth.currentUser;

    if (!user) {
      this.setState({ error: 'Debes estar logueado para crear un post' });
      return;
    }


    db.collection('posts')
      .add({
        owner: user.email,
        description: description,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({
          description: '',
          success: '¡Posteo publicado!',
          error: ''
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
          style={styles.textArea}
          placeholder="Escribe aquí tu post..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />

        <Pressable style={styles.button} onPress={() => this.handlePost()}>
          <Text style={styles.buttonText}>Publicar post</Text>
        </Pressable>

        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        {this.state.success ? <Text style={styles.success}>{this.state.success}</Text> : null}
      </View>
    );
  }
}

export default NewPost;

