var mes;
$(document).ready(function(){
	createSubject();
});


function createSubject(){
	function callback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	
	var httpMethod = "POST";
	var formData=$("#subject").serialize();
	var relativeUrl = "/Subject/NewSubject";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}