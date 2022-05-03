import React from 'react';
import { Button, Image, View, Text, TextInput } from 'react-native';


function NavigationBar(props)
{
    function doLogout() 
	{
		global.firstName = null;
        global.lastName = null;
        global.userId = null;
		props.appNavigator.navigate("Login");
	};    

    function goToHome(){
        try{                
            props.appNavigator.navigate("Home");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }
    function goToProfile(){
        try{                
            props.appNavigator.navigate("Profile");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }
    function goToWeight(){
        try{                
            props.appNavigator.navigate("Weight");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }

    return(
        <View style = {{justifyContent: "center", flexDirection: 'row'}}>
            <Button title="Home" onPress={() => goToHome()}/>
            <Button title="Profile" onPress={() => goToProfile()}/>
            <Button title="Weight" onPress={() => goToWeight()}/>
            <Button title="Log Out" onPress={() => doLogout()}/>        
        </View>
    );
};

export default NavigationBar;