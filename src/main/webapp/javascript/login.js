$(document).ready(function(){
	$("#btn-login").click(function(){
	event.preventDefault();
	attemptLogin();	
	});
});

function attemptLogin(){
	function callback(responseData,textStatus,request){
		var token=request.getResponseHeader('X-Authorization');
		$.session.set("token",token);
		alert(token);
		var role = responseData.role;
		if(role==DESK)
			{
			
			window.location.href="enq-list.html";
			}
		else if(role==ADMIN)
			{
			window.location.href="enquiry.html";
			}
		else
			{
			alert("role not assign");
			}
	}
	
	function errorCallback(responseData,textStatus,request){
		alert("Invalid Username or Password");
		/*alert("in error");
		var message=responseData.responseJSON.message;
		showNotification("error",message);
		alert(message);*/
	}
	var formData = $('#signin').serialize();
	var httpMethod="POST";
	var relativeUrl="/user/login";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}