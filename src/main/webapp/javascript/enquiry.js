$(document).ready(function(){
	$("#enq_data_submit").click(function(){
	var token=$.session.get('token');
	alert(token);
	validateLogin(token);
	event.preventDefault();
	EnquiryData();	
	});
});

function EnquiryData(){
	
	function callback(responseData,textStatus,request){
		alert("Data successfully inserted");
	}
	
	function errorCallback(responseData,textStatus,request){
		alert("Data not successfully inserted");
		/*var message=responseData.responseJSON.message;
		alert(message);*/
		/*alert("in error");
		var message=responseData.responseJSON.message;
		showNotification("error",message);
		alert(message);*/
	}
	var formData = $('#EnquiryForm').serialize();
	alert(formData);
	var httpMethod="POST";
	var relativeUrl="/Enquiry/EnquiryData";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}