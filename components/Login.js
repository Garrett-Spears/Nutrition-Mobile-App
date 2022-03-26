import React, { useState } from 'react';
import { Button, View, TextInput } from 'react-native';

function Login(props)
{
  // These will retrieve the user and pass to send to the api
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  function doLogin()
  {
    var obj = {Login:username, Password:password};
    var js = JSON.stringify(obj);

    props.appNavigator.navigate("Home");
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
      <Button title="Login" onPress={() => doLogin()}/>
    </View>
   );
};
export default Login;