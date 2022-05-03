import React, { Fragment } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import AddToDailyConsumption from '../components/AddToDailyConsumption.js';
import { Button, View, Text } from 'react-native';

function AddToDailyConsumptionScreen(props)
{
    
    return(
        <Fragment>
            <NavigationBar appNavigator={props.navigation}/>
        </Fragment>
    );
};

export default AddToDailyConsumptionScreen;