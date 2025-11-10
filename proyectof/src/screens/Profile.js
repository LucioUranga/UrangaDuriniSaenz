import { Text, View, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      posts: [],
    };
  }

  componentDidMount() {
    const user = auth.currentUser;

    if (user) {
      this.setState({ email: user.email });

      db.collection('users')
        .where('email', '==', user.email)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            const data = doc.data();
            this.setState({ userName: data.userName });
          });
        });


      db.collection('posts')
        .where('owner', '==', user.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
          let userPosts = [];
          docs.forEach((doc) => {
            userPosts.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ posts: userPosts });
        });
    }
  }

  manejarLogout() {
    auth
      .signOut()
      .then(() => {
        console.log('Sesión cerrada');
        this.props.navigation.navigate('Login');
      })
      .catch((error) => console.log('Error al cerrar sesión:', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <Text style={styles.info}>{this.state.userName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{this.state.email}</Text>
        </View>

        <Text style={styles.subtitle}>Mis posteos</Text>
        {this.state.posts.length === 0 ? (
          <Text style={styles.emptyText}>Todavía no publicaste nada.</Text>
        ) : (
          <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.card}>
                        <Text style={styles.owner}>{item.owner}</Text>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Pressable onPress={() => this.contadorLike(item.id, item.likes)}>
                          <Text>Like</Text>
                        </Pressable>
                        <Text>{item.likes.length} Me gusta</Text>
                        <Pressable
                          onPress={() =>
                            this.props.navigation.navigate('Comentarios', { postId: item.id })
                          }
                        >
                          <Text style={styles.comment}>Ver comentarios</Text>
                        </Pressable>
                      </View>
                    )}
                  />
        )}

        <Pressable style={styles.logoutBtn} onPress={() => this.manejarLogout()}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
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
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  info: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  postCard: {
    backgroundColor: '#e9ecef',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
  },
  postText: {
    fontSize: 15,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#888',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Profile;