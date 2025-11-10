import React, { Component } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';



export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));
        this.setState({ posts });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Los últimos posteos</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.owner}>{item.owner}</Text>
              <Text style={styles.desc}>{item.description}</Text>

              <Pressable
                onPress={() =>
                  this.props.navigation.navigate('Comentarios', { postId: item.id })
                }
              >
                <Text style={styles.comment}>💬 Ver comentarios</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 10 },
  owner: { fontWeight: 'bold' },
  desc: { marginVertical: 5 },
  comment: { color: '#0077b6', fontWeight: 'bold', marginTop: 5 },
});

export default Home;
import React, { Component } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));
        this.setState({ posts });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Los últimos posteos</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.owner}>{item.owner}</Text>
              <Text style={styles.desc}>{item.description}</Text>

              <Pressable
                onPress={() =>
                  this.props.navigation.navigate('Comentarios', { postId: item.id })
                }
              >
                <Text style={styles.comment}>💬 Ver comentarios</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 10 },
  owner: { fontWeight: 'bold' },
  desc: { marginVertical: 5 },
  comment: { color: '#0077b6', fontWeight: 'bold', marginTop: 5 },
});

export default Home;