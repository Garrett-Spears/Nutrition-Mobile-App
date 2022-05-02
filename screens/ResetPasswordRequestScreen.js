import React, { Fragment } from 'react';
import ResetPasswordRequestTitle from '../components/ResetPasswordRequestTitle';
import ResetPasswordRequest from '../components/ResetPasswordRequest';

function ResetPasswordRequestScreen(props)
{
   return(
    // Need to have fragment in react native to call multiple components
    <Fragment>
      <ResetPasswordRequestTitle />
      <ResetPasswordRequest appNavigator={props.navigation}/>
    </Fragment>
   );
};
export default ResetPasswordRequestScreen;