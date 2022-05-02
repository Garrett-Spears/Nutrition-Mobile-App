import React from 'react';
import { Button, Image, View, Text, TextInput } from 'react-native';


function NavigationBar(props)
{
    function doLogout() 
	{
		global.firstName = null;
        global.lastName = null;
        global.userId = null;
		props.navigation.navigate("Login");
	};    

    function goToHome(){
        try{                
            props.navigation.navigate("Home");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }
    function goToProfile(){
        try{                
            props.navigation.navigate("Profile");
        }
        catch(e){
            console.log(e.toString());
            return;
        }
    }
    function goToGoals(){
        try{                
            props.navigation.navigate("Goals");
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
            <Button title="Goals" onPress={() => goToGoals()}/>
            <Button title="Logout" onPress={() => doLogout()}/>        
        </View>
    );
};

export default NavigationBar;