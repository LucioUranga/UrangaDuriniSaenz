import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


export class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: []
    };
  }
componentDidMount() {
    
    db.collection('posts')
      .doc(this.props.route.params.postId)
      .onSnapshot((doc) => {
        const data = doc.data();
        this.setState({ comentarios: data.comments || [] });
      });
  }

  render() {
    return (
      <View>
        <Text>Crear nuevo comentario</Text>

        <TextInput
          placeholder="Escribe aquí tu comentario..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.comentarios}
        />

        <Pressable onPress={() => this.handlePost()}>
          <Text>Publicar comentario</Text>
        </Pressable>


      </View>
    );
  }
}

export default Comentarios

