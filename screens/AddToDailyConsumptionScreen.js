import React from 'react';
import { Button, View, Text, Fragment, TextInput } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AddToDailyConsumption from '../components/AddToDailyConsumption';

function AddToDailyConsumptionScreen(props)
{
   return(
    <View>
      <NavigationBar appNavigator={props.navigation} />
      <AddToDailyConsumption appNavigator={props.navigation} />
    </View>
   );
};
export default AddToDailyConsumptionScreen;