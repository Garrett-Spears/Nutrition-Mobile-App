// OgName: CardScreen.js
import React, { Fragment, useState, useEffect } from 'react';
// React Native does not have html components so need these
import { Button, View, Text, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from '../components/Main';
import NavigationBar from '../components/NavigationBar';
import ListTrackedFoods from '../components/ListTrackedFoods.js';
import DailyCharts from '../components/DailyCharts.js';

// Professor's Code Commented Out
// Using Functional Components for now since they're simpler
/*export default class Cardscreen extends Component {
  render() {
    return (
      <View style={{ backgroundColor:'#ff0000', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Card Screen</Text>
        <Button title="To Login" onPress={() => this.props.navigation.navigate('Login')}/>
      </View>
    )
  }
}*/

function MainScreen(props)
{
  const [selectedDate, setSelectedDate] = new useState(new Date());
  const [message, setMessage] = new useState('');
  const [foods, setFoods] = new useState([]);

  // Used to make sure that child components get up to date info
  const [show, setShow] = new useState(false);

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
          
          if (res.error.length > 0)
          {
              setMessage(res.error);
              setFoods([]);
              setShow(false);
          }
          else
          {
              var sortedFoods = [];

              // O(5n) algorithm to sort tracked foods by meal where n = number of tracked foods for that day
              let numMealOptions = 5;
              let n = res.trackedFoods.length;
              for (let mealType = 1; mealType < numMealOptions; mealType++)
              {
                  for (let i = 0; i < n; i++)
                  {
                      if (res.trackedFoods[i].Category === mealType)
                      {
                          sortedFoods.push(res.trackedFoods[i]);
                      }
                  }
              }
              for (let i = 0; i < n; i++)
              {
                  if (res.trackedFoods[i].Category === 0)
                      sortedFoods.push(res.trackedFoods[i]);
              }

              setFoods(sortedFoods);
              setShow(false);
              setShow(true);
          }
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
      <Main appNavigator={props.navigation} />
      <NavigationBar appNavigator={props.navigation}/>
      <ScrollView>
        <View style={{ justifyContent: "center", flexDirection: 'row' }}>
            <Button title="Previous" onPress={decrementDay}/>
            <Text>{selectedDate.toDateString()}</Text>
            <Button title="Next" disabled={selectedDate.toLocaleDateString() === (new Date()).toLocaleDateString()} onPress={incrementDay} />
        </View>

        {show && <ListTrackedFoods foods={foods} setMessage={setMessage} retrieveTrackedFoods={doRetrieveTrackedFoods} currentDate={selectedDate} />}
        <Text>{message}{message.length > 0 && "\n"}</Text>
        <Button title="Add To Your Daily Consumption" onPress={() => props.navigation.navigate("AddToDailyConsumption")}></Button>

        {show && <DailyCharts foods={foods} />}
      </ScrollView>
    </Fragment>
   );
};
export default MainScreen;