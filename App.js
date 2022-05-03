// App.js
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import ResetPasswordRequestScreen from './screens/ResetPasswordRequestScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import GoalsEdit from "./screens/GoalsEdit";

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
  ResetPasswordRequest: {
    screen: ResetPasswordRequestScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  },
  GoalsEdit: {
    screen: GoalsEdit,
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