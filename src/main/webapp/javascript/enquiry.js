var mes;
var editData=sessionStorage.getItem("EditData");
var request="";
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
	if(editData!=null){
		loadEditData(editData);
		request="Edit"
		document.getElementById("cancel").style.display = "block";
	}
	$("#cancel").click(function() {
		event.preventDefault();
		sessionStorage.removeItem("EditData");
	});
	$("#Add_employee").click(function() {
		event.preventDefault();
		AddEmployee();
	});
	$("#branch").val(branchSession);
});

function EnquiryData() {

	function callback(responseData, textStatus, request) {
		alert("suc");
		if(editData!=null){
			sessionStorage.removeItem("EditData");
		}
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
	alert(formData);
	var httpMethod = "POST";
	if(request==""){
	var relativeUrl = "/Enquiry/EnquiryData";
	}else
		{
		var relativeUrl = "/Enquiry/editEnquiryData";
		}
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

function loadEditData(Data){
	var data=Data.split(",");
	alert(Data);
	document.getElementById("sname").value=data[15];
	document.getElementById("lname").value=data[1];
	document.getElementById("fname").value=data[0];
	document.getElementById("mname").value=data[2];
	document.getElementById("uid").value=data[3];
	$("#dob").val(data[4]);
	//document.getElementById("dob").value = data[4];	
	$("input[name=gender][value="+data[5]+"]").attr('checked', true);
	$("#caste").val(data[6]);
	$("#category").val(data[7]);
	$("#lang").val(data[8]);
	document.getElementById("stud_cont").value=data[16];
	document.getElementById("father_cont").value=data[9];
	document.getElementById("mother_cont").value=data[10];
	$("#address").val(data[11]);
	//document.getElementByTagName("address").value=data[11];
	document.getElementById("pin").value=data[12];	
	document.getElementById("email").value=data[13];
	document.getElementById("w_app_no").value=data[14];
	document.getElementById("enq_date").value=data[17];
	document.getElementById("enq_no").value=data[18];
	document.getElementById('enq_no').readOnly = true;
	$("#enq_taken").val(data[19]);
	$("#fees").val(data[22]);
	$("#lead").val(data[20]);
	document.getElementById("remark").value=data[21];
}