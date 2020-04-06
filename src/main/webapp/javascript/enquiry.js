var mes;
$(document).ready(function() {
	FetchAllEmployee();
	//getCurrentDate();
	$("#enq_data_submit").click(function() {
		/*
		 * var token=$.session.get('token'); alert(token); validateLogin(token);
		 */
		event.preventDefault();
		EnquiryData();
	});
	$("#Add_employee").click(function() {
		alert("here");
		event.preventDefault();
		AddEmployee();
	});

});

function EnquiryData() {

	function callback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message); alert(message);
		 */
	}
	var formData = $('#EnquiryForm').serialize();
	alert(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Enquiry/EnquiryData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	function callback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#add_employee").serialize();
	alert(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function FetchAllEmployee() {
	function callback(responseData, textStatus, request) {

		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].emp_name + '" >'
					+ responseData[i].emp_name + '</option>';
			$('#enq_taken').append(htmlCode);
		}
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

//function getCurrentDate() {
//	var today = new Date();
//	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
//			+ today.getDate();
//	alert(date);
//	document.getElementById('enq_date').value = date;
//}
