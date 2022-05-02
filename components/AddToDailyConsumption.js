import React, { useState } from 'react';
import YourFood from './YourFood.js';
import UsdaFood from './UsdaFood.js';
import { Button, View, Text } from 'react-native';

function AddToDailyConsumption()
{
    const [displayYourFood, setDisplayYourFood] = useState(true);
    const [toggleString, setToggleString] = useState("Switch to Recommended Foods");

    // Flips the text on the button and the state of which database to search
    function switchSearchState()
    {
        // Changes text of toggle button on top
        if (!displayYourFood)
            setToggleString("Switch to Recommended Foods");
        else
            setToggleString("Switch to your Created Foods");
        
        setDisplayYourFood(!displayYourFood);
    }

    function goToCreateMealPage()
	{
        props.appNavigator.navigate("CreateMeal");
	}
      
    return(
        <View>
            <Text>Search for meals to add to you list of foods consumed today.\n</Text>
            <Button id="switchSearchState" class="buttons" onClick={switchSearchState}>{toggleString}</Button>

            {displayYourFood && <YourFood />}
            {!displayYourFood && <UsdaFood />}

            <Button title="Create Meal" onPress={() => goToCreateMealPage()}/>
        </View>
    );
};
export default AddToDailyConsumption;