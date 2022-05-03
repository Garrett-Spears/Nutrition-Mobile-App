import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import AddMeal from '../components/AddMeal.js';
import { View, Text } from 'react-native';

function CreateMealScreen(props)
{

	return(
	  	<View>
			  <NavigationBar appNavigator={props.navigation}/>
			  <AddMeal appNavigator={props.navigation} />
		</View>
	);
};
	
export default CreateMealScreen;