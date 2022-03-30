import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';

function ResetPasswordRequest(props)
{
    // This will decide which user to send a reset password email to
    const [ username, setUsername ] = useState("");

    // Message that will be displayed if the user provided does not exist
    const [ message, setMessage ] = useState("");

    async function doResetPasswordRequest()
    {
        var obj = { Login:username.trim() };
        var js = JSON.stringify(obj);

        try
        {
            var bp = require('./Path.js');
            const response = await fetch(bp.buildPath('api/passwordresetrequest'),{method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            var error = res.error;
            
            if (error.length > 0) // If no user was found to reset password.
            {
                setMessage(error);
                return;
            }
            else
            {
                // (LATER) Try adding popup window that tells user that they 
                // need to check email to reset your password.

                alert("Check Email to Reset your Password");

                // Route the user back to the login screen
                props.appNavigator.navigate("Login");

                return;
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

    return(
        <View id="resetPasswordRequestView">
            <Text>Enter your username and we'll send you a link to reset your password.</Text>
            <TextInput 
                placeholder="Username" 
                onChangeText={(text) => setUsername(text)} 
            />
            <Text>{message}</Text>
            <Button title="Reset Password" onPress={() => doResetPasswordRequest()}/>
        </View>
    );
}
export default ResetPasswordRequest;