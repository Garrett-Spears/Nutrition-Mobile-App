import React, { Fragment } from 'react';
import { View, Text } from 'react-native';

function ListTrackedFoods(props)
{
    // Simply just displays all the foods retrieved in a nice list format
    return(
        <View>
            <Text>{
                props.foods.map(food => (
                    <Fragment key={food._id}>
                        <Text>{food.Name}</Text>
                        <Text> | Qty: {food.Quantity}</Text>
                        <Text> | Calories: {food.Calories}</Text>
                        <Text> | Calories: {food.Calories}</Text>
                    </Fragment>
                ))}
            </Text>
        </View>
    );
};
export default ListTrackedFoods;