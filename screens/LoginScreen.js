// Loginscreen.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class Homescreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#0000ff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button title="Do Login" onPress={() => this.props.navigation.navigate('Card')}/>
      </View>
    )
  }
}