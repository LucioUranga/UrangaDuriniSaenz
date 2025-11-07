import { Text, View } from 'react-native'
import React, { Component } from 'react'


export class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts:[]
    }
  }
  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt')
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

export default Home