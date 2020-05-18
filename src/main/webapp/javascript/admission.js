var mes;
var enqData;
var branchSession=sessionStorage.getItem("branch");
$(document).ready(function(){
	admissionDetails();
	FetchAllEmployee();
	getFeesPackage();
	$("#enq_taken").val(localStorage.getItem("user"));
	//getCurrentDate();
	$("#enq_stud").keyup(function() {
		var id=document.getElementById('enq_stud').value;
		event.preventDefault();
		console.log(id);
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
	var select = document.getElementById('fees');
	var outputElem = document.getElementById('amount');
	select.addEventListener('change', function() {
		var fees_amt=select.value.split("|");
		outputElem.value = fees_amt[1];
		document.getElementById('total-amt').value=fees_amt[1];
		document.getElementById('amt_installment').value=fees_amt[1];
	});
	$("#discount").focusout(function() {
		var amount = document.getElementById('amount').value;
		var discount = document.getElementById('discount').value;
		var final_amt=amount-discount;
		document.getElementById('total-amt').value=final_amt;
		document.getElementById('amt_installment').value=final_amt;
	});
});


function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var id=responseData.id;
		var name=responseData.sname +" "+responseData.fname+" "+responseData.lname;
		var contact=responseData.stud_cont;
		var status=responseData.status;
		var stud_details=id +" | "+name+ " | "+contact+ " | "+status;
		document.getElementById('stud_details').value=stud_details;
		enqData=new Array();
		enqData.push(responseData.fname);
		enqData.push(responseData.lname);
		enqData.push(responseData.mname);
		enqData.push(responseData.uid);
		enqData.push(responseData.dob);
		enqData.push(responseData.gender);
		enqData.push(responseData.caste);
		enqData.push(responseData.category);
		enqData.push(responseData.lang);
		enqData.push(responseData.father_cont);
		enqData.push(responseData.mother_cont);
		enqData.push(responseData.address);
		enqData.push(responseData.pin);
		enqData.push(responseData.email);
		enqData.push(responseData.w_app_no);
		$("#fees").val(responseData.fees_pack);
		var fees=responseData.fees_pack.split("|");
		var fees=fees[1];
		document.getElementById('amount').value=fees;
		document.getElementById('total-amt').value=fees;
		document.getElementById('amt_installment').value=fees;

			//alert(document.getElementById('stud_details').value);
	}
	function errorCallback(responseData, textStatus, request) {
		
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
		
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id="+id+"&branch="+branchSession;
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

	var table=document.getElementById("installment_table");
	var rowCount=$('#installment_table tr').length;
	var installment="installment details";
	for (var i = 1; i < rowCount-1; i++) {
        var date = $(table.rows.item(i).cells[0]).find('input').val();
        var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
        var amt = $(table.rows.item(i).cells[2]).find('input').val();
        installment=installment+","+date+"|"+fees_title+"|"+amt;   
	}
	var table=document.getElementById("feestypetable");
	var rowCount=$('#feestypetable tr').length;
	var newAmt="0";
	for (var i = 1; i < rowCount-2; i++) {
        var discount = $(table.rows.item(i).cells[2]).find('input').val();
        if(discount!=0){
        total = $(table.rows.item(i).cells[5]).find('input').val();
        newAmt=newAmt+","+discount+"|"+total;
        } 
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
	var formData=$('#admission-form').serialize()+"&personalDetails="+enqData+"&installment="+installment+"&newAmt="+newAmt+"&branch="+branchSession;
	
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
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
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getFeesPackage() {

	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].feesPackage+"|" +responseData[i].total_amt+ '" >'
					+ responseData[i].feesPackage+"-" +responseData[i].total_amt + '</option>');
			$('#fees').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
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