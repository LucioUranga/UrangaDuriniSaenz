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
        <Text>Crear nuevo post</Text>

        <TextInput
          placeholder="Escribe aquí tu comentario..."
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.comentarios}
        />

        <Pressable onPress={() => this.handlePost()}>
          <Text>Publicar comentario</Text>
        </Pressable>

        {/* {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
        {this.state.success ? <Text style={styles.success}>{this.state.success}</Text> : null} */}
      </View>
    );
  }
}

export default Comentarios

