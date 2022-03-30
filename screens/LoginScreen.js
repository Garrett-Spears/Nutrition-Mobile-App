// Loginscreen.js
import React, { Fragment } from 'react';
import Login from '../components/Login';
import LoginTitle from '../components/LoginTitle';
import CreateNewAccount from '../components/CreateNewAccount';
import ForgotPassword from '../components/ForgotPassword';

// Professor's Code Commented Out
// Using Functional Components for now since they're simpler
/*export default class Homescreen extends Component {
  render() {
    return (
      <View>
        <Text>Login Screen</Text>
        <Button title="Do Login" onPress={() => this.props.navigation.navigate("Card")}/>
      </View>
    )
  }
}*/

function LoginScreen(props)
{
   return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <LoginTitle />
      <Login appNavigator={props.navigation}/>
      <ForgotPassword appNavigator={props.navigation}/>
      <CreateNewAccount appNavigator={props.navigation}/>
    </Fragment>
   );
};
export default LoginScreen;