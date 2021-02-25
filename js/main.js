// Get settings
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

function getParam(paramName){
	return urlParams.get(paramName);
}