import { Text, View } from 'react-native'
import React, { Component } from 'react'


export class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts:[]
    }
  }
  render() {
    return (
      <View>
        <Text>Los ultimos posteos</Text>
        
      </View>
    )
  }
}

export default Home