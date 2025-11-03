import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'

export class Profile extends Component {
  constructor(props) {  
    super(props)
  }
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Login')}>
          <Text>
            Logout
          </Text>
        </Pressable>
      </View>
    )
  }
}

export default Profile