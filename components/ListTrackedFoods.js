import React, { useState, useEffect, useRef } from 'react';
// React Native does not have html components so need these
import { Button, View, Text, Fragment, TextInput } from 'react-native';
import NutritionInfoPopup from './NutritionInfoPopup.js';

/*function useOutsideAlerter(ref, setEditFoodId) 
{
    useEffect(() => {
      //Alert if clicked on outside of edit quantity text box
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setEditFoodId(-1);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
}*/

function ListTrackedFoods(props)
{
    const [editFoodId, setEditFoodId] = useState(-1);
    const [selectedFoodInfo, setSelectedFoodInfo] = useState({});
    const [nutritionInfoPopupState, setNutritionInfoPopupState] = useState(false);

    // This will keep track of whatever the user types in the input field
    const [inputQty, setInputQty] = useState(null);

    // Array that defines what each meal's corresponding int value is
    const mealValues = ["Other", "Breakfast", "Lunch", "Dinner", "Snack"];

    //useOutsideAlerter(wrapperRef, setEditFoodId)

    async function doUpdateQuantity(foodId)
    {
        // Closes the input field
        setEditFoodId(-1);

        let newQty = inputQty;

        // Nothing typed in so leave
        if (newQty.length === 0)
        {
            props.setMessage("Please enter a quantity.");
            return;
        }

        let decimalCount = 0;
        for (let i = 0; i < newQty.length; i++)
        {
            if (newQty[i] === '.')
                decimalCount++;
        }

        // Invalid number typed in
        if (decimalCount >= 2 || (decimalCount === 1 && newQty.length === 1))
        {
            props.setMessage("Please enter a valid number.");
            return;
        }

        newQty = parseFloat(newQty);

        // Invalid quanitity so don't do anything
        if (newQty <= 0)
        {
            props.setMessage("Please enter a quantity greater than 0.");
            return;
        }

        // Get jwt token from local storage
        var storage = require('../tokenStorage.js');
        var tok = storage.retrieveToken();

        // create object from text boxes and make JSON 
        var obj = {
            trackedMealId:foodId,
            Quantity:newQty, 
            jwtToken:tok
        }
        var js = JSON.stringify(obj);

        try
        {   
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/editTrackMealQty/'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if (!res.jwtToken)
            {
                props.setMessage(res.error);
                return;
            }
            // Token was expired
            else if (res.jwtToken.length === 0)
            {
                alert("Your session has expired, please log in again.");
                
                global.firstName = "";
                global.lastName = "";
                global.userId = -1;

                props.navigation.navigate("Login");
                return;
            }

            global.token = res.jwtToken;
            
            if(res.error.length > 0)
            {
                props.setMessage(res.error);
            }
            else
            {
                props.retrieveTrackedFoods(props.currentDate);
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

    async function doUntrackFood(foodId)
    {
        // Get jwt token from local storage
        var storage = require('../tokenStorage.js');
        var tok = storage.retrieveToken();

        // Clear any existing message
        props.setMessage('');

        var obj = { 
            jwtToken:tok
        }
        var js = JSON.stringify(obj);

        try
        {   
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/deletetracked/' + foodId),{method:'DELETE', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if (!res.jwtToken)
            {
                props.setMessage(res.error);
                return;
            }
            // Token was expired
            else if (res.jwtToken.length === 0)
            {
                alert("Your session has expired, please log in again.");

                global.firstName = "";
                global.lastName = "";
                global.userId = -1;

                props.navigation.navigate("Login");
                return;
            }

            storage.storeToken(res.jwtToken);
            
            if(res.error.length > 0)
            {
                props.setMessage(res.error);
            }
            else
            {
                await props.retrieveTrackedFoods(props.currentDate);
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

    // Sets value to true to display nutrition info of whatever food was selected
    function showInfoPopup(selectedFood)
    {
        props.setMessage('');
        setNutritionInfoPopupState(true);
        setSelectedFoodInfo(selectedFood);
    }

    // Sets value to false to close nutrtion info popup
    function hideInfoPopup()
    {
        setNutritionInfoPopupState(false);
        setSelectedFoodInfo({});
    }

    function handleOpeningInput(id, qty)
    {
        props.setMessage("");
        setEditFoodId(id);
        setInputQty(qty);
    }

    // Prevents negative values from being typed in
    const preventInvalid = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    var style =
    {
        padding: '10px', 
        display: 'flex', 
        'textAlign':'center', 
        'justifyContent':'center', 
        'alignItems':'center',
        width: '100%'
    }

    // Simply just displays all the foods retrieved in a nice list format
    return(
    <View>
        {props.foods.map(food => (
            <View key={food._id} style={{ flexDirection: 'row' }}>
                <Text>{food.Name}</Text>
                {(editFoodId !== food._id) ? <Text onPress={() => handleOpeningInput(food._id, food.Quantity)}> {food.Quantity} </Text> 
                                                : <View><TextInput keyboardType='numeric' placeholder={food.Quantity + ''} defaultValue={food.Quantity + ''} autoFocus={true} onChangeText={(text) => setInputQty(text)} /><Button title="Save" onPress={() => doUpdateQuantity(food._id)} /><Button title="Cancel" onPress={() => setEditFoodId(-1)} /></View>}
                <Text>{food.Quantity * food.Calories}</Text>
                <Text>{mealValues[food.Category]}</Text>
                <Button title="View" onPress={() => showInfoPopup(food)} />
                <Button title="Untrack" onPress={() => doUntrackFood(food._id)} />
            </View>
        ))}
        <NutritionInfoPopup show={nutritionInfoPopupState} food={selectedFoodInfo} closePopup={hideInfoPopup} />
    </View>
    );
};
export default ListTrackedFoods;