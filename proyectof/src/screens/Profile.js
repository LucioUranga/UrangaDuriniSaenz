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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#a8c0ff', // color base celeste/lavanda
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1d3557',
  },
  infoContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1d3557',
  },
  card: {
    backgroundColor: '#f1f5ff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cddafd',
  },
  owner: {
    fontWeight: 'bold',
    color: '#003566',
  },
  desc: {
    marginVertical: 5,
    fontSize: 15,
    color: '#212529',
  },
  likeButton: {
    color: '#e63946',
    fontWeight: '600',
    marginTop: 8,
  },
  likeCount: {
    fontSize: 14,
    color: '#495057',
  },
  comment: {
    color: '#0077b6',
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutBtn: {
    backgroundColor: '#e63946',
    padding: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;