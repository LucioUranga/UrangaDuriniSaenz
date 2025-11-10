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
        likes: []
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
contadorLike(){
const userEmail = auth.currentUser.email;

    if (currentLikes.includes(userEmail)) {
      db.collection('posts')
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
        });
    } else {
      db.collection('posts')
        .doc(postId)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
        });
    }

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
      </View>
    );
  }
}

export default NewPost

