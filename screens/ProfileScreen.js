import React, { Fragment } from 'react';
import { Button, View, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import GoalsDisplay from '../components/GoalsDisplay';

function ProfilePage(props)
{

	return(
		<Fragment>
			<NavigationBar appNavigator={props.navigation}/>
			<GoalsDisplay appNavigator={props.navigation}/>
		</Fragment>
	);
};

export default ProfilePage;