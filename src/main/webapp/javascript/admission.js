$(document).ready(function(){
	admissionDetails();
	FetchAllEmployee();
	//getCurrentDate();
	$("#enq_stud").keyup(function() {
		var id=parseInt(document.getElementById('enq_stud').value);
		event.preventDefault();
		SearchStudent(id);
	});
	$("#admission-form").submit(function() {
		event.preventDefault();
		StudentAdmission();
	});
	$("#EnquiryForm").submit(function() {
		event.preventDefault();
		AddNewEnquiryStudent();
	});
	$("#addEmployee").submit(function() {
		event.preventDefault();
		AddEmployee();
	});
});


function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var id=responseData.id;
		var name=responseData.sname +" "+responseData.lname;
		var contact=responseData.stud_cont;
		var status=responseData.status;
		var stud_details=id +" | "+name+ " | "+contact+ " | "+status;
			document.getElementById('stud_details').value=stud_details;
			//alert(document.getElementById('stud_details').value);
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id="+id;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function admissionDetails(){
	var initial_rno=01;
	var initial_regno=01;
	var initial_invoice=01;
	function callback(responseData,textStatus,request)
	{
		if(responseData==null||responseData=="")
			{
			document.getElementById('ID_no').value=parseInt(initial_rno);
			document.getElementById('reg_no').value=parseInt(initial_regno);
			document.getElementById('invoice_no').value=parseInt(initial_invoice);
			}
		else{
			for (var i in responseData)
			{
				document.getElementById('ID_no').value=parseInt(responseData[i].Rollno)+1;
				document.getElementById('reg_no').value=parseInt(responseData[i].regno)+1;
				document.getElementById('invoice_no').value=parseInt(responseData[i].invoice_no)+1;
			}
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/FetchAllAdmittedStudent";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function StudentAdmission(){
	function callback(responseData,textStatus,request)
	{
		alert("submited");
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData=$('#admission-form').serialize();
	alert(formData);
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddNewEnquiryStudent(){
	function callback(responseData, textStatus, request) {
		alert("Data successfully inserted");
	}

	function errorCallback(responseData, textStatus, request) {
		alert("Data not successfully inserted");
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message); alert(message);
		 */
	}
	var formData = $('#EnquiryForm').serialize();
	var httpMethod = "POST";
	var relativeUrl = "/Enquiry/EnquiryData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	function callback(responseData, textStatus, request) {
		alert("Data successfully inserted");
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not successfully inserted");
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#addEmployee").serialize();
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
		alert("Data not Found");
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
/*function getCurrentDate() {
	   var todaydate = new Date();
	   var day = todaydate.getDate();
	   var month = todaydate.getMonth() + 1;
	   var year = todaydate.getFullYear();
	   var datestring = month + "-" + day + "-" + year;
	   document.getElementById("current_date").value = datestring;
}*/