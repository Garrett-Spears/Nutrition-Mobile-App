import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

function Register(props)
{
    // These will retrieve the user's info to send to the api
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    // Message that will be displayed if login attempt was unsuccessful
    const [ message, setMessage ] = useState("");

    async function doRegister()
    {
        var obj = {FirstName:firstName.trim(), LastName:lastName.trim(), Login:username.trim(), Password:password.trim(), Email:email.trim(), Birthday:birthday.trim()};
        var js = JSON.stringify(obj);

        try
        {
            // Make an api call to the remote login api (No local login api defined for mobile app)
            var bp = require("./Path.js");
            const response = await fetch(bp.buildPath("api/register"),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            var error = res.error;
            
            if (error.length > 0) // If new user was unsuccessful in registering.
            {
                setMessage(error);
                return;
            }
            else
            {
                // (LATER) Try adding popup window that tells user they successfully registered
                // and that they need to check email for verification to log in.

                alert("Check Email to Verify before Logging In");

                // Route the user back to the login screen
                props.appNavigator.navigate("Login");

                return;
            }
        }
        catch(e)
        {
            setMessage(e.toString());
            return;
        }
    }

    return(
        <View id="registerView">
            <TextInput 
                placeholder="First Name" 
                onChangeText={(text) => setFirstName(text)} 
            />
            <TextInput 
                placeholder="Last Name" 
                onChangeText={(text) => setLastName(text)} 
            />
            <TextInput 
                placeholder="Email" 
                onChangeText={(text) => setEmail(text)} 
            />
            <TextInput 
                placeholder="Date of Birth" 
                onChangeText={(text) => setBirthday(text)} 
            />
            <TextInput 
                placeholder="New Username" 
                onChangeText={(text) => setUsername(text)} 
            />
            <TextInput 
                placeholder="New Password" 
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)} 
            />
            <Text>{message}</Text>
            <Button title="Create Account" onPress={() => doRegister()}/>
        </View>
    );
}
export default Register;