var mes;
requestid = 0;
$(document).ready(function() {
	validateLogin();
	checkUserLevel();
	fetchAllBranch();
	fetchAllRole();
	FetchAllEmployee();
	getDesignation();
	EmployeeList();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Please enter letters only");

	jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	});
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than your Date of birth.');
	
	
	
	$('form[id="createAc"]').validate({
		rules : {

			role : {
				required : true,

			},
			enq_taken : {
				required : true,
			},

			userid : {
				required : true,

			},
			password : {
				required : true,
			},
		},
		messages : {
			role : {
				required : 'Please select any role',
			},
			enq_taken : {
				required : 'Please select any Employee',
			},

			userid : {
				required : 'Please enter your Username',
			},
			password : {
				required : 'Please enter your password',
			},

		},
		submitHandler : function(form) {
			event.preventDefault();
			createEmployeeAccount();
		}
	});
	$('form[id="add_employee"]').validate({

		rules : {

			emp_name : {
				required : true,
				lettersonly : true

			},
			emp_unq_code : {
				required : true,
			},

			email : {
				required : true,
				email : true

			},
			address : {
				required : true,
			},
			contact : {
				required : true,
				digits : true,
				minlength : 10,
				maxlength : 10
			},
			dob : {
				required : true,
				date : true,
				futureDate : true
			},

			join_date : {
				required : true,
				date : true,
				greaterThan:"#dob"

			},
			design : {
				required : true
			},
		},
		messages : {

			contact : 'Please enter correct mobile number',
				dob:'Date of birth cannot be a future date'
		},
		submitHandler : function(form) {
			event.preventDefault();
			AddEmployee();
		}
	});

	$('#UserMgmt_table').DataTable({
		"pageLength" : 40
	});

	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	$("#editBtn").click(function(e) {
		event.preventDefault();
		$("table .cbCheck").each(function(i, chk) {
			if (chk.checked) {
				requestid = $(this).val();
				loadUserAccount(i, e);
			}
		});
	});

	$("#deletBtn").click(function(e) {
		event.preventDefault();
		$("table .cbCheck").each(function(i, chk) {
			if (chk.checked) {
				requestid = $(this).val();
				deactivateUserAccount();
			}
		});
	});
	var select = document.getElementById('enq_taken');
	select.addEventListener('change', function() {
		var emp_name=document.getElementById("enq_taken").value;
		document.getElementById("ebranch").disabled=false;
		var branch=document.getElementById("ebranch").value;
		document.getElementById("ebranch").disabled=true;
		checkAccountExist(emp_name,branch);
	});
	$("#userid").focusout(function(){
		var username=document.getElementById("userid").value;
		if(username.trim()!=""){
		checkUsernameExist(username);
		}
	})
});

function EmployeeList() {
	function callback(responseData, textStatus, request) {
		var table = $("#UserMgmt_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var emp_role = responseData[i].role;
			var emp_name = responseData[i].name;
			var created_date = responseData[i].created_date;
			var userid = responseData[i].userid;
			var branch = responseData[i].Branch;
			table.row.add(
					[ chck, created_date, emp_name, userid, emp_role, branch ])
					.draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	var relativeUrl = "/user/getAllAccount?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById("employee_type").disabled = false;
	document.getElementById("emp_branch").disabled = false;
	function callback(responseData, textStatus, request) {

		 var message=responseData.responseJSON.message;
		 showNotification("success", mes);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
	}
	function errorCallback(responseData, textStatus, request) {
		  var mes=responseData.responseJSON.message;
		  showNotification("error",mes);
		 
	}
	var formData = $("#add_employee").serialize();
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function createEmployeeAccount() {
	var message;
	document.getElementById("emp_type").disabled = false;
	document.getElementById("ebranch").disabled = false;
	function callback(responseData, textStatus, request) {

		message=responseData.responseJSON.message;
		showNotification("success",mes);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
		clearModal();
	}
	function errorCallback(responseData, textStatus, request) {
		  message=responseData.responseJSON.message;
		  showNotification("error",message);
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if (requestid == 0) {
		formData = $("#createAc").serialize();
		relativeUrl = "/user/createEmployeeAccount";
	} else {
		formData = $("#createAc").serialize() + "&id=" + requestid;
		relativeUrl = "/user/EditEmployeeAccount";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function loadUserAccount(i, e) {
	var table = $("#UserMgmt_table").DataTable();
	empname = table.rows({
		selected : true
	}).column(2).data()[i];
	username = table.rows({
		selected : true
	}).column(3).data()[i];
	role = table.rows({
		selected : true
	}).column(4).data()[i];
	$("#enq_taken").val(empname);
	$("#role").val(role);
	document.getElementById("userid").value = username;
	e.preventDefault();
	$("#datatable-view").hide();
	$("#datatable-view-2").show();
}

function clearModal() {
	$("#enq_taken").val(user);
	document.getElementById("userid").value = "";
	document.getElementById("password").value = "";
	requestid = 0;
}

function deactivateUserAccount() {
	function callback(responseData, textStatus, request) {
		  var mes=responseData.responseJSON.message;
		  showNotification("success",mes);
		  requestid = 0;
	}
	function errorCallback(responseData, textStatus, request) {
		  var mes=responseData.responseJSON.message;
		  showNotification("error",mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/user/DeactivateAccount?id=" + requestid;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function checkAccountExist(emp_name,branch){
	function callback(responseData, textStatus, request) {
			
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		  showNotification("error",mes);
	}
	var httpMethod = "POST";
	var formData={
			emp_name : emp_name,
			branch : branch
	}
	var relativeUrl = "/user/checkAccountExist";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
}
function checkUsernameExist(username){
	function callback(responseData, textStatus, request) {
		var mes=responseData.message;
		showNotification("success",mes);
		document.getElementById('btnSave').disabled = false;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		  showNotification("error",mes);
		  document.getElementById('btnSave').disabled = true;
	}
	var httpMethod = "GET";
	var relativeUrl = "/user/checkUsernameExist?userid="+username+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;
}
function checkUserLevel(){
	if(emp_type=="Organizatoin Level Employee"){
		document.getElementById("emp_type").disabled=false;
		document.getElementById("ebranch").disabled=false;
		$("#emp_type").val(emp_type);
	}else{
		document.getElementById("emp_type").disabled=true;
		document.getElementById("ebranch").disabled=true;
		$("#emp_type").val(emp_type);
		$(".branch").val(branchSession);
	}
}
function fetchAllRole(){
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].role + '" >'
					+ responseData[i].role + '</option>';
			$('#role').append(htmlCode);
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/user/getAllRole?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}