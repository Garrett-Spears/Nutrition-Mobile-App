import React from 'react';
import { Button, View, Text, Fragment, TextInput, ScrollView } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import AddToDailyConsumption from '../components/AddToDailyConsumption';

function AddToDailyConsumptionScreen(props)
{
   return(
    <View>
      <NavigationBar appNavigator={props.navigation} />
      <ScrollView><AddToDailyConsumption appNavigator={props.navigation} /></ScrollView>
    </View>
   );
};
export default AddToDailyConsumptionScreen;