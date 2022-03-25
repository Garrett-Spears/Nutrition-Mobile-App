// OgName: CardScreen.js
import React, { Component, Fragment } from 'react';
// React Native does not have html components so need these
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainTitle from '../components/MainTitle';
import Main from '../components/Main';

// Professor's Code Commented Out
// Using Functional Components for now since they're simpler
/*export default class Cardscreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#ff0000', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Card Screen</Text>
        <Button title="To Login" onPress={() => this.props.navigation.navigate('Login')}/>
      </View>
    )
  }
}*/

function MainScreen(props)
{
   return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <MainTitle />
      <Main appNavigator={props.navigation} />
    </Fragment>
   );
};
export default MainScreen;