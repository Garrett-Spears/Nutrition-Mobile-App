import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

global.userId = -1;
global.firstName = "";
global.lastName = "";

function Login(props)
{
  // These will retrieve the user and pass to send to the api
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  // Message that will be displayed if login attempt was unsuccessful
  const [ message, setMessage ] = useState("");

  async function doLogin()
  {
    var obj = {Login:username.trim(), Password:password.trim()};
    var js = JSON.stringify(obj);

    try
    {
      // Make an api call to the remote login api (No local login api defined for mobile app)
      var bp = require("./Path.js");
      const response = await fetch(bp.buildPath("api/login"),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
      var res = JSON.parse(await response.text());
      
      if( res.UserId <= 0 )
      {
          // Unsucessful login attempt
          setMessage("The user/password combination you entered is incorrect. Please try again.");
      }
      else
      {          
          // Store the user's info as global variables
          global.firstName = res.FirstName;
          global.lastName = res.lastName;
          global.userId = res.UserId;

          // Clear any possible login error message
          setMessage("");

          // Route the user to the home page of the app
          props.appNavigator.navigate("Home");
      }
    }
    catch(e)
    {
      setMessage(e.toString());
      return;
    }
  }

   return(
    <View id="loginView">
      <TextInput 
        placeholder="Username" 
        onChangeText={(text) => setUsername(text)} 
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)} 
      />
      <Text>{message}</Text>
      <Button title="Login" onPress={() => doLogin()}/>
    </View>
   );
};
export default Login;