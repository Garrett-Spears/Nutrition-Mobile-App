// App.js
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      //header: null // Will hide header for login screen
    }
  },
  Home: {
    screen: MainScreen,
    navigationOptions: {
      //header: null // Will hide header for main screen
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  }
},{
  initialRouteName: "Login"
});
const AppContainer = createAppContainer(AppNavigator);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/