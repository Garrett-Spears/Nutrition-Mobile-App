import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import NavigationBar from '../components/NavigationBar.js';

function GoalsEdit(props) 
{
    // Initialize fields required for object, get user data, and create message variable
    var storage = require('../tokenStorage.js');
    var tok = storage.retrieveToken();

    const [ weight, setW ] = useState("");
    const [ calories, setC ] = useState("");
    const [ protein, setP ] = useState("");
    const [ carbs, setCa ] = useState("");
    const [ fat, setF ] = useState("");
    const [ fiber, setFi ] = useState("");
    const [ sugar, setS ] = useState("");
    const [ sodium, setSo ] = useState("");
    const [ cholesterol, setCh ] = useState("");

    const [message,setMessage] = useState('');

    const doEditGoals = async event => 
    {
        
        // create object from text boxes and make JSON 
        var obj = { 
            UserId:global.userId, 
            Weight: parseInt(weight.value),
            Calories: parseInt(calories.value), 
            Protein: parseInt(protein.value), 
            Carbs: parseInt(carbs.value), 
            Fat: parseInt(fat.value), 
            Fiber: parseInt(fiber.value), 
            Sugar: parseInt(sugar.value), 
            Sodium: parseInt(sodium.value), 
            Cholesterol: parseInt(cholesterol.value),
            jwtToken:tok
        }
        var js = JSON.stringify(obj);
        try
        {    
            // Send off package to api and await response 
            var bp = require('../components/Path.js');
            const response = await fetch(bp.buildPath('api/editGoal/'), {method:'PUT', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            
            // I'll make the error messages nicer later - Declan
            if( res.error )
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('Goals set!');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

  return (
    <View>
            <NavigationBar appNavigator={props.navigation}/>
            <TextInput 
                placeholder="Weight" 
                onChangeText={(text) => setW(text)} 
            />
            <TextInput 
                placeholder="Calories" 
                onChangeText={(text) => setC(text)} 
            />
            <TextInput 
                placeholder="Protein" 
                onChangeText={(text) => setP(text)} 
            />
            <TextInput 
                placeholder="Carbs" 
                onChangeText={(text) => setCa(text)} 
            />
            <TextInput 
                placeholder="Fat" 
                onChangeText={(text) => setF(text)} 
            />
            <TextInput 
                placeholder="Fiber" 
                onChangeText={(text) => setFi(text)} 
            />
            <TextInput 
                placeholder="Sugar" 
                onChangeText={(text) => setS(text)} 
            />
            <TextInput 
                placeholder="Sodium" 
                onChangeText={(text) => setSo(text)} 
            />
            <TextInput 
                placeholder="cholesterol" 
                onChangeText={(text) => setCh(text)} 
            />
            <Text>{message}</Text>
            <Button title = "Set Goals" onPress={() => doEditGoals()}/>  
     </View>
  );
};

export default GoalsEdit;