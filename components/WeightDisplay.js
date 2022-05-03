import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

function WeightDisplay() 
{
    // Initialize fields required for object, get user data, and create message variable

    var storage = require('../tokenStorage.js');
    var tok = storage.retrieveToken();

    const [weights, getW] = new useState([]);
    const [message,setMessage] = useState('');
    const [inputWeight, setW ] = useState('');
    
    async function getData()
    {
        var obj = {
            UserId: global.userId,
            jwtToken: tok
        }
        var js = JSON.stringify(obj);
        try
        { 
            // Send off package to api and await response 
            var bp = require('./Path.js');
            // THIS WILL CHANGE BECAUSE API ENDPOINT HAS NOT YET BEEN CREATED
            const response = await fetch(bp.buildPath('api/retrieveWeights/'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            
            if ( res.error.length > 0)
            {
                displayWeight = 'N/A';
                return;
            }
            else{
                getW(res.weights[res.weights.length-1].Weight);
                
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    
    
    const doRecordWeight = async event => 
    {
        
        // create object from text boxes and make JSON 
        var obj = { 
            UserId: global.userId, 
            newWeight: parseInt(inputWeight),
            Date: new Date().toLocaleDateString(),
            jwtToken:tok
        }
        var js = JSON.stringify(obj);
        try
        {    
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/addweight/'), {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            // I'll make the error messages nicer later - Declan
            if( res.error )
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('Weight set!');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // Initialize list of foods on page
    useEffect(() => {
        getData();
    }, []);

    return (
        <View>
            <Text> Current Weight: {weights}lbs</Text>  
            <TextInput 
                placeholder="Weight" 
                onChangeText={(text) => setW(text)} 
            />  
            <Text>{message}</Text>
            <Button title = "Record Weight" onPress = {() => doRecordWeight()}/>
        </View>
    );
};

export default WeightDisplay;
