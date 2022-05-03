import React from 'react';
import Modal from "react-native-modal";
import { Button, View, Text, Fragment, TextInput, StyleSheet } from 'react-native';


function NutritionInfoPopup(props) 
{
    var food = props.food;
    var name, calories, protein, carbs, fat, fiber, sugar, sodium, cholesterol;
    var servingLabel, showServing;

    // Get all the nutritional values from the selected food
    name = food.Name;
    calories = food.Calories;
    protein = food.Protein;
    carbs = food.Carbs;
    fat = food.Fat;
    fiber = food.Fiber;
    sugar = food.Sugar;
    sodium = food.Sodium;
    cholesterol = food.Cholesterol;

    // Round nutrition values
    calories = Math.round(calories);
    sodium = Math.round(sodium);
    cholesterol = Math.round(cholesterol);
    if (carbs < 10)
        carbs = Math.round(carbs * 10) / 10;
    else
        carbs = Math.round(carbs);
    if (fat < 10)
        fat = Math.round(fat * 10) / 10;
    else
        fat = Math.round(fat);
    if (fiber < 10)
        fiber = Math.round(fiber * 10) / 10;
    else
        fiber = Math.round(fiber);
    if (protein < 10)
        protein = Math.round(protein * 10) / 10;
    else
        protein = Math.round(protein);
    if (sugar < 10)
        sugar = Math.round(sugar * 10) / 10;
    else
        sugar = Math.round(sugar);

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

    var center = {
    width: '40%',
    height: '50%',
    top: '50%',
    left: '20%',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
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
          alignItems: "center",
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

    return (
        <View style={styles.centeredView}>
            <Modal isVisible={props.show}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View >
                            <Text>{name}</Text>
                            <Text>Calories: {calories}</Text>
                            <Text>Protein: {protein}g</Text>
                            <Text>Carbs: {carbs}g</Text>
                            <Text>Fat: {fat}g</Text>
                            <Text>Fiber: {fiber}g</Text>
                            <Text>Sugar: {sugar}g</Text>
                            <Text>Sodium: {sodium}mg</Text>
                            <Text>Cholesterol: {cholesterol}mg</Text>
                            <Button title="Close" onPress={props.closePopup} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NutritionInfoPopup;
