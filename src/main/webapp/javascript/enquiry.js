var mes;

$(document).ready(function() {
	$('form[id="EnquiryForm"]').validate({
		  rules: {
		    sname: {
		    	required:true
		    },
		    lname: {
		      required: true
		    }
		  },
		  messages: {
			sname: {
				required:'This field is required'
			},
			lname: {
				required:'This field is required'
		    }
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  EnquiryData();
		  }
	});

	FetchAllEmployee();
	//getCurrentDate();
	/*$("#enq_data_submit").click(function() {
		var token=sessionStorage.getItem("token");
		validateLogin(token);
		 
		event.preventDefault();
		EnquiryData();
	});*/
	$("#Add_employee").click(function() {
		event.preventDefault();
		AddEmployee();
	});
	$("#branch").val(branchSession);
});

function EnquiryData() {

	function callback(responseData, textStatus, request) {
		alert("suc")
		/*var mes=responseData.responseJSON.message;
		showNotification("success",mes);*/
	}

	function errorCallback(responseData, textStatus, request) {
		alert("f");
		/*var mes=responseData.responseJSON.message;
		showNotification("error",mes);
*/		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message); alert(message);
		 */
	}
	var formData = $('#EnquiryForm').serialize()+"&branch="+branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Enquiry/EnquiryData";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById('emp_type').disabled = false;
	document.getElementById('branch').disabled = false;
	function callback(responseData, textStatus, request) {
		
		// var message=responseData.response.JSON.message;
		// alert(message);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
	}
	function errorCallback(responseData, textStatus, request) {
		/*var mes=responseData.responseJSON.message;
		showNotification("error",mes);*/
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#add_employee").serialize();
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

/*function FetchAllEmployee() {
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
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branch;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}*/

//function getCurrentDate() {
//	var today = new Date();
//	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
//			+ today.getDate();
//	alert(date);
//	document.getElementById('enq_date').value = date;
//}
