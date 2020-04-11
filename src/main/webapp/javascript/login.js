var mes;
$(document).ready(function(){
	$("#btn-login").click(function(){
	event.preventDefault();
	attemptLogin();	
	});
});

function attemptLogin(){
	function callback(responseData,textStatus,request){
		var token=request.getResponseHeader('X-Authorization');
		sessionStorage.setItem("tok", token);
		/*alert("tok ="+token);*/
		/*$.session.set("tok",token);*/
		alert("t="+sessionStorage.getItem("tok"));
		var role = responseData.role;
		alert(role);
		var name = responseData.name;
		
		if(role==DESK)
			{
			
			window.location.href="dashboard.html";
			localStorage.setItem("user",name);
			}
		else if(role==ADMIN)
			{
			
			window.location.href="dashboard.html";
			localstorage.setItem("user",name);
			}
		else
			{
			mesasge="Role Not Assign.";
			}
	}
	
	function errorCallback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var formData = $('#signin').serialize();
	var httpMethod="POST";
	var relativeUrl="/user/login";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}