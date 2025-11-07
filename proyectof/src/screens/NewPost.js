import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: '',
      success: '',
      likes: [],
      comentarios: []
    };
  }


  handlePost() {
    const description = this.state.description;
    const user = auth.currentUser;

    if (!user) {
      this.setState({ error: 'Debes estar logueado para crear un post' });
      return;
    }


    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        description: description,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({
          description: '',
          success: 'Posteo publicado',
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
      <View>
        <Text>Crear nuevo post</Text>

        <TextInput
          placeholder="Escribe aquí tu post..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />

        <Pressable onPress={() => this.handlePost()}>
          <Text>Publicar post</Text>
        </Pressable>

        {/* {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        {this.state.success ? <Text style={styles.success}>{this.state.success}</Text> : null} */}
      </View>
    );
  }
}

export default NewPost

