import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config';

export class Profile extends Component {
  constructor(props) {  
    super(props)
  }

  manejarLogout() {
    auth.signOut()
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Pressable onPress={() => this.manejarLogout()}>
          <Text>
            Logout
          </Text>
        </Pressable>
      </View>
    )
  }
}

export default Profile