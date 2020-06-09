var mes;
var editData=sessionStorage.getItem("EditData");
var request="";
$(document).ready(function() {
	getCaste();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	$('form[id="EnquiryForm"]').validate({
		  rules: {
		    sname: {
		    	required:true,
		    	lettersonly:true,
		    	noSpace: true
		    },
		    lname: {
		      required: true,
		      lettersonly:true,
		      noSpace: true
		      
		    },
		    fname: {
			      required: true,
			      lettersonly:true,
			      noSpace: true
			},
			mname: {
			      required: true,
			      lettersonly:true,
			      noSpace: true
			},
			uid: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
			},
			stud_cont: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			father_cont: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			mother_cont: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			addr: {
		        required: true
			},
			pin: {
		        required: true,
		        digits: true,
		        minlength: 4,
		        maxlength: 12,
			},
			email: {
		        required: true,
		        email: true
			},
			w_app_no: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
		  },
		 /* messages: {
			sname: {
				required:'your name is required'
			},
			lname: {
				required:'Surname is required'
		    },
		    fname: {
				required:'father name is required'
		    },
		    mname: {
				required:'Mother name is required'
		    },
		  },*/
		  submitHandler:function(form){
			  event.preventDefault();
			  EnquiryData();
		  }
	});
	//add_employee validation
	$('form[id="add_employee"]').validate({
		  rules: {
			  emp_name: {
		    	required:true,
		    	lettersonly:true,
		    	noSpace: true
		    },
		    emp_unq_code: {
		      required: true,
		      digits:true
		    },
		    email: {
		        required: true,
		        email: true
		    },
		    address: {
		        required: true
			},
			contact: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			dob:{
				required:true,
				date:true
			},
			join_date:{
				required:true,
				date:true
			},
			design:{
				required:true
			},
		  },
		
		  submitHandler:function(form){
			  event.preventDefault();
			  AddEmployee();
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
	$("#feestype-form").submit(function() {
		event.preventDefault();
		addFeesType();
	});
	$("#employee-modal").click(function(e){
		e.preventDefault();
		$('#addEmployeeModal').modal({
	        show: true, 
	        backdrop: 'static',
	        keyboard: true
	     })
	})
	$("#feespackage-modal").click(function(e){
		e.preventDefault();
		$('#myFeesPackageModal').modal({
	        show: true, 
	        backdrop: 'static',
	        keyboard: true
	     });
	});
	$("#fees-type-modal").click(function(e){
		e.preventDefault();
		$('#feestypeModal').modal({
	        show: true, 
	        backdrop: 'static',
	        keyboard: true
	     });
	});
	$('#feestypetable').on('click','.remove-row',function(e) {
		var val = $(this).closest('tr').find('#total-amt').val();
		document.getElementById("grand-t").value = parseInt(document.getElementById("grand-t").value)- parseInt(val);
		$(this).closest('tr').remove();
		});
	
	
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
	//$("#address").val(data[11]);
	document.getElementById("addr").value=data[11];
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
function addFeesType() {
	function callback(responseData,textStatus,request)
	{
//		var mes=responseData.responseJSON.message;
//		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData =$("#feestype-form").serialize()+"&branch="+branchSession;
	alert(formData);
	var relativeUrl = "/feesType/addNewFeesType";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}
