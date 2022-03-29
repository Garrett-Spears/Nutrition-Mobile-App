import React from 'react';
import { Button, View } from 'react-native';

// Takes you to register page when "Create New Account" button is clicked on.
function CreateNewAccount(props)
{  
    function goToRegisterPage()
    {
        try
        {                
            props.appNavigator.navigate("Register");
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    }

	return(
		<View>
            <Button title="Create New Account" onPress={() => goToRegisterPage()}/>
		</View>
	);
};
export default CreateNewAccount;