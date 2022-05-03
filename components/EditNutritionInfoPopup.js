import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, Keyboard } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Modal from "react-native-modal";

function EditNutritionInfoPopup(props)
{   
    const [didEditFood, setDidEditFood] = useState(false);

      const [name, setName] = useState('');
      const [calories, setCalories] = useState(-1);
      const [protein, setProtein] = useState(-1);
      const [carbs, setCarbs] = useState(-1);
      const [fat, setFat] = useState(-1);
      const [fiber, setFiber] = useState(-1);
      const [sugar, setSugar] = useState(-1);
      const [sodium, setSodium] = useState(-1);
      const [cholesterol, setCholesterol] = useState(-1);
      const [message,setMessage] = useState(-1);

      if (!props.show)
        return null;
      
      // Get all the nutritional values from the selected food
      var nameD, caloriesD, proteinD, carbsD, fatD, fiberD, sugarD, sodiumD, cholesterolD;
      var food = props.food;
      
      // Get all the nutritional values from the selected food
      userId = global.userId;
      nameD = food.Name;
      caloriesD = food.Calories;
      proteinD = food.Protein;
      carbsD = food.Carbs;
      fatD = food.Fat;
      fiberD = food.Fiber;
      sugarD = food.Sugar;
      sodiumD = food.Sodium;
      cholesterolD = food.Cholesterol;

      // This function just resets the displayed message whenever the user starts typing again in any of the input text boxes.
      function clearMessage()
      {
        setMessage("");
      }
      
      async function doEditNutritionInfo()
      {
        // Get jwt token from local storage
        var storage = require('../tokenStorage.js');
        var tok = storage.retrieveToken();

        // create object from text boxes and make JSON 
        var obj = {
            Name:name.value, 
            Calories:calories.value, 
            Protein:protein.value, 
            Carbs:carbs.value, 
            Fat:fat.value, 
            Fiber:fiber.value, 
            Sugar:sugar.value, 
            Sodium:sodium.value, 
            Cholesterol:cholesterol.value, 
            jwtToken:tok
        }
        var js = JSON.stringify(obj);

        // Gets the food's unique id
        let pathRoute = food._id;

        try
        {   
            
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/editmeal/' + pathRoute),{method:'PUT', body:js, headers:{'Content-Type': 'application/json'}});
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
                localStorage.removeItem("user_data")
		        window.location.href = '/';
                return;
            }

            storage.storeToken(res.jwtToken);
            
            if(res.error.length > 0)
            {
                setMessage(res.error);
            }
            else
            {
                setMessage('Successfully edited '+ '\"' + res.meal.Name + '\"');
                setDidEditFood(true);
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
      }

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

      const styles = StyleSheet.create({
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        }
      });

      console.log(caloriesD);

      return (
        <View style={styles.centeredView}>
            <Modal isVisible={props.show}>
              <View >
                  <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row' }}><Text>Name: </Text><TextInput defaultValue={nameD} returnKeyType='done' onChangeText={(text) => handleChangeText(text, setName)} /></View><Text> *{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Calories: </Text><TextInput defaultValue={caloriesD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setCalories)} /></View><Text> *{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Protein: </Text><TextInput defaultValue={proteinD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setProtein)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Carbs: </Text><TextInput defaultValue={carbsD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setCarbs)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Fat: </Text><TextInput defaultValue={fatD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setFat)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Fiber: </Text><TextInput defaultValue={fiberD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setFiber)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Sugar: </Text><TextInput defaultValue={sugarD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setSugar)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Sodium: </Text><TextInput defaultValue={sodiumD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setSodium)} /></View><Text>{"\n"}</Text>
                    <View style={{ flexDirection: 'row' }}><Text>Cholesterol: </Text><TextInput defaultValue={cholesterolD} returnKeyType='done' keyboardType='numeric' onChangeText={(text) => handleChangeText(text, setCholesterol)} /></View><Text>{"\n"}</Text>
                    <Button title="Edit" onPress={doEditNutritionInfo} /><Text>{"\n"}</Text>
                    <Button title="Close" onPress={()=>props.closePopup(didEditFood, setDidEditFood, setMessage)} /><Text>{"\n"}</Text>
                    <Text>{message}</Text>
                  </View>
              </View>
            </Modal>
        </View>
      );
  }
  export default EditNutritionInfoPopup;