import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Keyboard } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import {Picker} from '@react-native-picker/picker';

function TrackFoodPopup(props)
{   
      const [message,setMessage] = useState('');
      const [quantity,setQuantity] = useState(1);
      const [category,setCategory] = useState("0");
    
      var food = props.food;
      var inputQty;
      var userId;
      var name, calories, protein, carbs, fat, fiber, sugar, sodium, cholesterol;
      var servingLabel, showServing;
      
      // Get all the nutritional values from the selected food
      userId = global.userId;
      name = food.Name;
      calories = food.Calories;
      protein = food.Protein;
      carbs = food.Carbs;
      fat = food.Fat;
      fiber = food.Fiber;
      sugar = food.Sugar;
      sodium = food.Sodium;
      cholesterol = food.Cholesterol;

      // Only given specified serving label from foods in external database
      if (food.ServingLabel)
      {
        servingLabel = "Serving Size: " + food.ServingLabel;
        showServing = true;
      }
      else
      {
        servingLabel = "";
        showServing = false;
      }

      // This function just resets the displayed message whenever the user starts typing again in any of the input text boxes.
      function clearMessage()
      {
        setMessage("");
      }
      
      async function doTrackFood()
      {
        let newQty = quantity;

        // Nothing typed in so defualt to 1
        if (newQty.length === 0)
        {
            newQty = "1";
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
            setMessage("Please enter a valid number.");
            return;
        }

        newQty = parseFloat(newQty);

        // Invalid quanitity so don't do anything
        if (newQty <= 0)
        {
            setMessage("Please enter a quantity greater than 0.");
            return;
        }

        // Get jwt token from local storage
        var storage = require('../tokenStorage.js');
        var tok = storage.retrieveToken();

        let date = new Date().toLocaleDateString()
        let categoryInt = parseInt(category);

        // create object from text boxes and make JSON 
        var obj = {
            UserId:userId,
            MealId:food._id,
            Name:name, 
            Calories:calories, 
            Protein:protein, 
            Carbs:carbs, 
            Fat:fat, 
            Fiber:fiber, 
            Sugar:sugar, 
            Sodium:sodium, 
            Cholesterol:cholesterol,
            Category:categoryInt,
            Quantity:newQty,
            Date:date, 
            jwtToken:tok
        }
        var js = JSON.stringify(obj);
  
        try
        {   
            
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/trackmeal/'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
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

                props.appNavigator.navigate("Login");
                return;
            }

            storage.storeToken(res.jwtToken);
            
            if(res.error.length > 0)
            {
                setMessage(res.error);
            }
            else
            {
                if (newQty === 1)
                  setMessage('Successfully Added ' + newQty + ' \"' + name + '\" to your daily list of tracked foods.');
                else
                  setMessage('Successfully Added ' + newQty + ' \"' + name + '\"s to your daily list of tracked foods.');
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
      }

      // Changes nutrtiional values for food corresponding to the quantities being selected by the user
      function adjustNutritionalValues()
      {
          // If nothing is entered, default to 1
          if (inputQty.value.length === 0)
          {
            setQuantity(1);
          }
          else 
          {
            setQuantity(parseFloat(inputQty.value));
          }
      }

      // Prevents negative values from being typed in
      const preventInvalid = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
      };

      function handlePickerChange(newCategory)
      {
        setMessage("");
        setCategory(newCategory);
      }

      function handleQuantityChange(newQty)
      {
        setMessage("");
        setQuantity(newQty);
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

      //<Text>Quantity: <input type="number" step="1" min="1" defaultValue="1" onInput={clearMessage} onKeyPress={preventInvalid} onChange={adjustNutritionalValues} ref={(c) => inputQty = c} /> </Text>          
      return (
        <View style={styles.centeredView}>
            <Modal isVisible={props.show}>
              <View >
                  <View style={styles.modalView}>
                      <Text>{name}</Text>
                      <Text>Calories: {calories * quantity}</Text>
                      <Text>Protein: {protein * quantity}</Text>
                      <Text>Carbohydrates: {carbs * quantity}</Text>
                      <Text>Fat: {fat * quantity}</Text>
                      <Text>Fiber: {fiber * quantity}</Text>
                      <Text>Sugar: {sugar * quantity}</Text>
                      <Text>Sodium: {sodium * quantity}</Text>
                      <Text>Cholesterol: {cholesterol * quantity}</Text>
                      {showServing && <Text>{servingLabel}</Text>}
                      <Text>Quantity: </Text>
                      <TextInput keyboardType='numeric' returnKeyType='done' onSubmitEditing={Keyboard.dismiss}cplaceholder="1" defaultValue="1" onChangeText = {(text) => handleQuantityChange(text)}></TextInput>
                      <Text>Choose meal (Optional):</Text>
                      <Picker selectedValue={category} onValueChange={(e) => handlePickerChange(e)}>
                        <Picker.Item value="0" label=""/>
                        <Picker.Item value="1" label="Breakfast"/>
                        <Picker.Item value="2" label="Lunch"/>
                        <Picker.Item value="3" label="Dinner"/>
                        <Picker.Item value="4" label="Snack"/>
                      </Picker>
                      <Button class="buttons" title = "Track" onPress={() => doTrackFood()}/>
                      <Button class="buttons" title = "Close" onPress={()=>props.closePopup(setMessage, setQuantity, setCategory)}/> 
                      <Text>{message}</Text>
                  </View>
              </View>
            </Modal>
        </View>
      );
  }
  export default TrackFoodPopup;