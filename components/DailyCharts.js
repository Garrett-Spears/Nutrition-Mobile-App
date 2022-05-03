import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import * as Progress from 'react-native-progress';

function DailyCharts(props) 
{
    // Initialize fields required for object, get user data, and create message variable
    var userId = global.userId;

    const [goals, setGoals] = new useState(null);
    const [totalNutrtionInfo, setTotalNutritionInfo] = new useState(null);
    const [pieData, setPieData] = new useState(null);

    async function getData()
    {
        try
        { 
            // Send off package to api and await response 
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/retrievegoal/' + userId),{method:'GET', headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error )
            {
                console.log(res.error);
            }
            else
            {
                await setGoals(res.goal);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    function calculateTotals()
    {
        // Initialize totals to empty values
        let totalCalories, totalProtein, totalCarbs, totalFat, totalFiber, totalSugar, totalSodium, totalCholesterol;
        totalCalories = totalProtein = totalCarbs = totalFat = totalFiber = totalSugar = totalSodium = totalCholesterol = 0;

        let foods = props.foods;

        // Loops through all the tracked foods and sum up their totals
        for (let i = 0; i < foods.length; i++)
        {
            let currentFood = foods[i];
            let qty = currentFood.Quantity;

            totalCalories += currentFood.Calories * qty;
            totalProtein += currentFood.Protein * qty;
            totalCarbs += currentFood.Carbs * qty;
            totalFat += currentFood.Fat * qty;
            totalFiber += currentFood.Fiber * qty;
            totalSugar += currentFood.Sugar * qty;
            totalSodium += currentFood.Sodium * qty;
            totalCholesterol += currentFood.Cholesterol * qty;
        }

        // Round values to display nicely
        totalCalories = Math.round(totalCalories);
        totalSodium = Math.round(totalSodium);
        totalCholesterol = Math.round(totalCholesterol);
        if (totalCarbs < 10)
            totalCarbs = Math.round(totalCarbs * 10) / 10;
        else
            totalCarbs = Math.round(totalCarbs);
        if (totalFat < 10)
            totalFat = Math.round(totalFat * 10) / 10;
        else
            totalFat = Math.round(totalFat);
        if (totalFiber < 10)
            totalFiber = Math.round(totalFiber * 10) / 10;
        else
            totalFiber = Math.round(totalFiber);
        if (totalProtein < 10)
            totalProtein = Math.round(totalProtein * 10) / 10;
        else
            totalProtein = Math.round(totalProtein);
        if (totalSugar < 10)
            totalSugar = Math.round(totalSugar * 10) / 10;
        else
            totalSugar = Math.round(totalSugar);

        let totalMacros = totalProtein * 4 + totalCarbs * 4 + totalFat * 9;

        let z1 = Math.round(totalProtein * 4 / totalMacros * 100);
        let z2 = Math.round(totalCarbs * 4 / totalMacros * 100);
        let z3 = Math.round(totalFat * 9 / totalMacros * 100); 
        let pieData = [
            { x: "Protein (" + z1 + "%)", y: totalProtein * 4},
            { x: "Carbs (" + z2 + "%)", y: totalCarbs * 4},
            { x: "Fat (" + z3 + "%)", y: totalFat * 9}
        ];

        setPieData(pieData)

        let totalsSet = {
            TotalCalories:totalCalories,
            TotalProtein:totalProtein,
            TotalCarbs:totalCarbs,
            TotalFat:totalFat,
            TotalFiber:totalFiber,
            TotalSugar:totalSugar,
            TotalSodium:totalSodium,
            TotalCholesterol:totalCholesterol
        }

        setTotalNutritionInfo(totalsSet);
    }

    useEffect(() => {
        getData();
        calculateTotals();
    }, []);


    var style =
    {
        padding: '20px', 
        display: 'flex', 
        'textAlign':'center', 
        'justifyContent':'center', 
        'alignItems':'center'
    }

  return (
    <View>
        {totalNutrtionInfo !== null && goals != null &&
        <View style ={{paddingHorizontal : 95}}>
            <Text>Progress toward Daily Goals</Text>
            <Text>Calories: </Text><Progress.Bar progress={totalNutrtionInfo.TotalCalories / goals.Calories} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalCalories}/{goals.Calories} kcal</Text>
            </Progress.Bar>
            <Text>Protein: </Text><Progress.Bar progress={totalNutrtionInfo.TotalProtein / goals.Protein} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalProtein}/{goals.Protein}g</Text>
            </Progress.Bar>
            <Text>Carbs: </Text><Progress.Bar progress={totalNutrtionInfo.TotalCarbs / goals.Carbs} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalCarbs}/{goals.Carbs}g</Text>
            </Progress.Bar>
            <Text>Fat: </Text><Progress.Bar progress={totalNutrtionInfo.TotalFat / goals.Fat} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalFat}/{goals.Fat}g</Text>
            </Progress.Bar>
            <Text>Fiber: </Text><Progress.Bar progress={totalNutrtionInfo.TotalFiber / goals.Fiber} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalFiber}/{goals.Fiber}g</Text>
            </Progress.Bar>
            <Text>Sugar: </Text><Progress.Bar progress={totalNutrtionInfo.TotalSugar / goals.Sugar} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalSugar}/{goals.Sugar}g</Text>
            </Progress.Bar>
            <Text>Sodium: </Text><Progress.Bar progress={totalNutrtionInfo.TotalSodium / goals.Sodium} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalSodium}/{goals.Sodium}mg</Text>
            </Progress.Bar>
            <Text>Cholesterol: </Text><Progress.Bar progress={totalNutrtionInfo.TotalCholesterol / goals.Cholesterol} width={200} height={19}>
                <Text style={{alignSelf:"center", position:"absolute",top:0.5}}>{totalNutrtionInfo.TotalCholesterol}/{goals.Cholesterol}mg</Text>
            </Progress.Bar>
        </View>}
        <View>
            <Text style ={{paddingVertical : 10}}></Text>
            <Text style ={{paddingHorizontal : 5}}>Macro Breakdown</Text>
            {pieData !== null && <VictoryPie labelRadius = {50} colorScale={["tomato", "orange", "gold" ]} labelPlacement = {"parallel"} data={pieData} labels={({ datum }) => datum.x }/>}
        </View>
    </View>
  );
};
export default DailyCharts;