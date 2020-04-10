$(document).ready(function(){
	profile();
});

function profile(){
	var val = localStorage.getItem("user");
	document.getElementById('profile').innerHTML  = val;
}