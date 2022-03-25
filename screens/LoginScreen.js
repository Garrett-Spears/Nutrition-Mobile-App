// Loginscreen.js
import React, { Component, Fragment } from 'react';
// React Native does not have html components so need these
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../components/Login';
import LoginTitle from '../components/LoginTitle';

// Professor's Code Commented Out
// Using Functional Components for now since they're simpler
/*export default class Homescreen extends Component {
  render() {
    return (
      <View>
        <Text>Login Screen</Text>
        <Button title="Do Login" onPress={() => this.props.navigation.navigate("Card")}/>
      </View>
    )
  }
}*/

function LoginScreen(props)
{
   return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <LoginTitle />
      <Login appNavigator={props.navigation}/>
    </Fragment>
   );
};
export default LoginScreen;