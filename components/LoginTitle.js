import React, { Component } from 'react';
// React Native does not have html components so need these
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

function LoginTitle()
{
   return(
    <View id="loginTitleView">
      <Text id="title">Please Log In</Text>
    </View>
   );
};
export default LoginTitle;