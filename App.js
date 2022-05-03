// App.js
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import ResetPasswordRequestScreen from './screens/ResetPasswordRequestScreen';
import RegisterScreen from './screens/RegisterScreen';
<<<<<<< HEAD
import ProfileScreen from './screens/ProfileScreen';
import GoalsScreen from './screens/GoalsScreen';
import DailyConsumptionScreen from './screens/DailyConsumptionScreen';
=======
>>>>>>> 0d04c5f56d2481d64ef5a68720b6081d2668bf46

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
<<<<<<< HEAD
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    },
  Goals: {
    screen: GoalsScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  },
  AddToDailyConsumption: {
    screen: DailyConsumptionScreen,
    navigationOptions: {
      //header: null // Will hide header for register screen
    }
  }

=======
>>>>>>> 0d04c5f56d2481d64ef5a68720b6081d2668bf46
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