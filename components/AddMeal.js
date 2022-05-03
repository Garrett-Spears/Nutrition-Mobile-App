import React, { useState } from 'react';
import { Button, View, Text, Fragment, TextInput, StyleSheet } from 'react-native';


function AddMeal() 
{
    // Initialize fields required for object, get user data, and create message variable
    var userId = global.userId;
    
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [fiber, setFiber] = useState('');
    const [sugar, setSugar] = useState('');
    const [sodium, setSodium] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [message,setMessage] = useState('');

    var storage = require('../tokenStorage.js');

    // This function just resets the displayed message whenever the user starts typing again in any of the input text boxes.
    function clearMessage()
    {
        setMessage("");
    }

    async function doAddMeal() 
    {
        // create object from text boxes and make JSON 
        var tok = storage.retrieveToken();

        var obj = { UserId:userId, 
                    Name:name, 
                    Calories:calories, 
                    Protein:protein, 
                    Carbs:carbs, 
                    Fat:fat, 
                    Fiber:fiber, 
                    Sugar:sugar, 
                    Sodium:sodium, 
                    Cholesterol:cholesterol,
                    jwtToken:tok
                }; 
        var js = JSON.stringify(obj);
        try
        {    
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/addmeal'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if (res.jwtToken === null)
            {
                setMessage(res.error);
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

            // I'll make the error messages nicer later - Declan
            if( res.error )
            {
                setMessage(res.error);
            }
            else
            {
                setMessage("\"" + name + "\" successfully added to your list of foods.");
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
  };

  // Prevents negative values from being typed in
  const preventInvalid = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
  };

  function handleChangeText(text, setFunc)
  {
      setFunc(text);
      clearMessage();
  }

  return (
    <View>
        <Text>Add Meal (required fields indicated by *){"\n"}</Text>
        <TextInput placeholder="Food Name" onChangeText={(text) => handleChangeText(text, setName)} /><Text> *{"\n"}</Text>
        <TextInput placeholder="Calories" onChangeText={(text) => handleChangeText(text, setCalories)} /><Text> *{"\n"}</Text>
        <TextInput placeholder="Protein (g)" onChangeText={(text) => handleChangeText(text, setProtein)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Carbohydrates (g)" onChangeText={(text) => handleChangeText(text, setCarbs)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Fat (g)" onChangeText={(text) => handleChangeText(text, setFat)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Fiber (g)" onChangeText={(text) => handleChangeText(text, setFiber)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Sugar (g)" onChangeText={(text) => handleChangeText(text, setSugar)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Sodium (mg)" onChangeText={(text) => handleChangeText(text, setSodium)} /><Text>{"\n"}</Text>
        <TextInput placeholder="Cholesterol (mg)" onChangeText={(text) => handleChangeText(text, setCholesterol)} /><Text>{"\n"}</Text>
        <Button title="Add Food " onPress={doAddMeal} /><Text>{"\n"}</Text>
        <Text>{message}</Text>
     </View>
  );
};
export default AddMeal;
