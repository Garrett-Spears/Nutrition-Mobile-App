import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import AddMeal from '../components/AddMeal.js';

function CreateMealPage(props)
{

	function goBack()
	{
		window.location.href = "/Main/AddToDailyConsumption"
	}

	return(
	  	<div>
			<NavigationBar appNavigator={props.navigation}/>
			<button type="button" id="backButton" class="buttons" onClick={goBack}> Back </button>
			<AddMeal />
	  	</div>
	);
};
	
export default CreateMealPage;