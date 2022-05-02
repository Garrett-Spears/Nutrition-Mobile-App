import React, { Fragment } from 'react';
import { Button, View, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import GoalsDisplay from '../components/GoalsDisplay';

function ProfilePage(props)
{
	function goToGoals()
    {
        try
        {                
            props.navigation.navigate("Goals");
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

	return(
		<Fragment>
			<NavigationBar appNavigator={props.navigation}/>
			<GoalsDisplay appNavigator={props.navigation}/>
			<Button title = "Set New Goals" onPress={() => goToGoals()}/>  
		</Fragment>
	);
};

export default ProfilePage;