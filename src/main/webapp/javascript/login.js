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
		$.session.set("token",token);
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