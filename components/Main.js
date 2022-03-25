import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

function Main(props)
{
   return(
    <View id="mainView">
      <Button title="Log Out" onPress={() => props.appNavigator.navigate("Login")}/>
    </View>
   );
};
export default Main;