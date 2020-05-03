var mes;
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
		
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
		
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
	var stud_details=document.getElementById("stud_details");
	var enq_taken=document.getElementById("enq_taken");
	var fees=document.getElementById("fees");
	var status=document.getElementById("status");
	var date=document.getElementById("date");
	var ID_no=document.getElementById("ID_no");
	var reg_no=document.getElementById("reg_no");
	var invoice_no=document.getElementById("invoice_no");
	var admission_date=document.getElementById("admission_date");
	var acad_year=document.getElementById("acad_year");
	var join_date=document.getElementById("join_date");
	var table=document.getElementById("installment_table");
	var rowCount=$('#installment_table tr').length;
	var installment="installment details";
	for (var i = 1; i < rowCount-1; i++) {
        var date = $(table.rows.item(i).cells[0]).find('input').val();
        var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
        var amt = $(table.rows.item(i).cells[2]).find('input').val();
        installment=installment+","+date+"|"+fees_title+"|"+amt;   
	}
	
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData=$('#admission-form').serialize()+"&installment="+installment;
	console.log(formData);
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddNewEnquiryStudent(){
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
/*function getCurrentDate() {
	   var todaydate = new Date();
	   var day = todaydate.getDate();
	   var month = todaydate.getMonth() + 1;
	   var year = todaydate.getFullYear();
	   var datestring = month + "-" + day + "-" + year;
	   document.getElementById("current_date").value = datestring;
}*/