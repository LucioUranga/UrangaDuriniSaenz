import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase/app';

export class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '',
      comentarios: [],
      postId: this.props.route.params.postId
    };
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.state.postId)
      .onSnapshot((doc) => {
        this.setState({ comentarios: doc.data().comentarios || [] });
      });
  }

  handleComment() {
    const user = auth.currentUser.email;
    db.collection('posts')
      .doc(this.state.postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          user: user,
          text: this.state.comentario,
          createdAt: Date.now(),
        }),
      })
      .then(() => this.setState({ comentario: '' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>
        <FlatList
          data={this.state.comentarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>{item.user}: {item.text}</Text>
          )}
        />
        <TextInput
          placeholder="Escribe un comentario..."
          value={this.state.comentario}
          onChangeText={(text) => this.setState({ comentario: text })}
          style={styles.input}
        />
        <Pressable onPress={() => this.handleComment()}>
          <Text style={styles.button}>Agregar comentario</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 10 },
  button: { color: 'blue', marginTop: 10 },
});


export default Comentarios;