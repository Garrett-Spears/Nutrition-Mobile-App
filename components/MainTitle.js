import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

function MainTitle()
{
   return(
    <View id="mainTitleView">
      <Text id="title">Main Page</Text>
    </View>
   );
};
export default MainTitle;