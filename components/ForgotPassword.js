import React from 'react';
import { Button, View } from 'react-native';

// Takes you to reset password page when "Forgot password?" button is clicked on.
function ForgotPassword(props)
{  
    function goToResetPasswordRequestScreen()
    {
        try
        {                
            props.appNavigator.navigate("ResetPasswordRequest");
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

	return(
		<View>
            <Button title="Forgot Password?" onPress={() => goToResetPasswordRequestScreen()}/>
		</View>
	);
};
export default ForgotPassword;