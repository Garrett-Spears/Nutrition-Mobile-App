import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

function Login(props)
{
   return(
    <View id="loginView">
      <Button title="Login" onPress={() => props.appNavigator.navigate("Home")}/>
    </View>
   );
};
export default Login;