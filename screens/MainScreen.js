import React, { Component, Fragment, useState, useEffect } from 'react';

// React Native does not have html components so need these
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainTitle from '../components/MainTitle';
import Main from '../components/Main';
import NavigationBar from '../components/NavigationBar';
import ListTrackedFoods from '../components/ListTrackedFoods';

function MainScreen(props)
{
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [foods, setFoods] = new useState([]);


  // Number of milliseconds in a day
  const msInDay = 86400000;

  async function decrementDay()
  {     
      let newDate = new Date(selectedDate.valueOf() - msInDay);
      setSelectedDate(newDate);
      doRetrieveTrackedFoods(newDate);
  }
  
  function incrementDay()
  {
      let newDate = new Date(selectedDate.valueOf() + msInDay);

      // Don't let user quick double click past disabled restriction
      if(newDate > (new Date()))
      {
          doRetrieveTrackedFoods(selectedDate);
          return;
      }

      setSelectedDate(newDate);
      doRetrieveTrackedFoods(newDate);
  }

  async function doRetrieveTrackedFoods(newDate)
  {
      // clear message since new message is ab to be displayed
      setMessage("");

      let userId = global.userId;

      // Get jwt token from local storage
      let storage = require('../tokenStorage.js');
      let tok = storage.retrieveToken();

      let date = newDate.toLocaleDateString();

      var obj = {
          UserId:userId,
          jwtToken:tok,
          Date:date
      }

      var js = JSON.stringify(obj);
      try
      {     
          // Send off package to api and await response 
          var bp = require('../components/Path.js');
          const response = await fetch(bp.buildPath('api/retrievetracked/'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
          var res = JSON.parse(await response.text());

          if (!res.jwtToken)
          {
              setMessage(res.error);
              return;
          }
          // Token was expired
            else if (res.jwtToken.length === 0){
                alert("Your session has expired, please log in again.");
                global.firstName = null;
                global.lastName = null;
                global.userId = null;
                props.navigation.navigate("Home");;
                return;
            }

          storage.storeToken(res.jwtToken);
          
          if (res.error.length > 0){
              setMessage(res.error);
              setFoods([]);
          }
          else{
              setFoods(res.trackedFoods);
          }
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }
  }

  function goToDailyConsumptionScreen()
    {
        try
        {                
            props.AppNavigator.navigate("AddToDailyConsumption");
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

  // Initialize list of trackedfoods on page when page first renders
  useEffect(() => {
      doRetrieveTrackedFoods(selectedDate);
  }, []);

  return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <MainTitle />
      <Main appNavigator={props.navigation} />
      <View>
          <NavigationBar appNavigator={props.navigation}/>
          <View style = {{flexDirection: 'row', justifyContent: "center"}}>
            <Button title = "Previous" onPress={() => decrementDay()}/>
            <Text style = {{paddingVertical: 10}}>{selectedDate.toDateString()}</Text>
            <Button  title = "Next" disabled = {selectedDate.toLocaleDateString() === (new Date()).toLocaleDateString()} onPress={() => incrementDay()}/>
            </View>
          <Text >{message}</Text>
          <ListTrackedFoods foods={foods} />
          <Button title="Add To Your Daily Consumption" onPress={() => goToDailyConsumptionScreen()}/>
          
      </View>
    </Fragment>
   );
};
export default MainScreen;