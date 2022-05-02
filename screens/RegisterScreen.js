import React, { Fragment } from 'react';
import RegisterTitle from '../components/RegisterTitle';
import Register from '../components/Register';

function RegisterScreen(props)
{
   return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <RegisterTitle />
      <Register appNavigator={props.navigation}/>
    </Fragment>
   );
};
export default RegisterScreen;