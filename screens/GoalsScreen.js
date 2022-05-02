import React, { Fragment } from 'react';
import { Button, View, Text } from 'react-native';
import NavigationBar from '../components/NavigationBar';
import WeightDisplay from '../components/WeightDisplay';

function ProgressPage(props)
{   
    return(
        <Fragment>
            <NavigationBar appNavigator={props.navigation}/>
            <WeightDisplay appNavigator={props.navigation}/>
        </Fragment>
    );
};

export default ProgressPage;