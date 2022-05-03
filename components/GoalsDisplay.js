import React, { useState, useEffect, Fragment } from 'react';
import { Button, Text, View } from 'react-native';

function GoalsDisplay(props) 
{
    // Initialize fields required for object, get user data, and create message variable
    let userId = global.userId;
    var firstName =global.firstName;
	var lastName = global.lastName;

    const [goals, setGoals] = new useState([]);
    //var goals;
  
    const [message,setMessage] = useState('');
    
    async function getData()
    {
        try
        { 
            // Send off package to api and await response 
            var bp = require('./Path.js');
            // THIS WILL CHANGE BECAUSE API ENDPOINT HAS NOT YET BEEN CREATED
            const response = await fetch(bp.buildPath('api/retrievegoal/' + userId),{method:'GET', headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.error)
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('');
            }

            setGoals(res.goal);
            //console.log(goals);
            
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    function goToGoalsEdit(){
        try{                
            props.appNavigator.navigate("GoalsEdit");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }

    useEffect(() => {
        getData();
    }, []);


    var style =
    {
        flexDirection: 'column', 
        'textAlign':'center', 
        'justifyContent':'center', 
        'alignItems':'center'
    }

  return (
    <Fragment>
    <View style = {style}>
        <Text>{firstName} {lastName}'s Current Goals</Text>
        <Text>Weight: {goals.Weight}</Text>
        <Text>Calories: {goals.Calories}</Text>
        <Text>Protein: {goals.Protein}</Text>
        <Text>Carbohydrates: {goals.Carbohydrates}</Text>
        <Text>Fat: {goals.Fat}</Text>
        <Text>Fiber: {goals.Fiber}</Text>
        <Text>Sugar: {goals.Sugar}</Text>
        <Text>Sodium: {goals.Sodium}</Text>
        <Text>Cholesterol: {goals.Cholesterol}</Text>
    </View>
    <Button title = "Set New Goals" onPress={() => goToGoalsEdit()}/>  
    </Fragment>
  );
};

export default GoalsDisplay;
