var mes;
requestid=0;
$(document).ready(function() {
	$('#UserMgmt_table').DataTable({
		"pageLength" : 40
	});
	fetchAllBranch();
	FetchAllEmployee();
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	EmployeeList();
	$(".branch").val(branchSession);
	$("#Add_employee").click(function() {
		event.preventDefault();
		AddEmployee();
	});
	$("#btnSave").click(function() {
		event.preventDefault();
		createEmployeeAccount();
	});
	$("#edit").click(function(e) {
		event.preventDefault();
		$("table .cbCheck").each(function(i, chk) {
			if(chk.checked){
				requestid=$(this).val();
				loadUserAccount(i,e);
				}
			});
	});
	$("#deactivate").click(function(e) {
		event.preventDefault();
		$("table .cbCheck").each(function(i, chk) {
			if(chk.checked){
				requestid=$(this).val();
				deactivateUserAccount();
				}
			});
	});
});

function EmployeeList() {
	function callback(responseData, textStatus, request) {
		var table = $("#UserMgmt_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var emp_role = responseData[i].role;
			var emp_name = responseData[i].name;
			var created_date = responseData[i].created_date;
			var userid = responseData[i].userid;
			var branch = responseData[i].Branch;
			table.row.add([ chck, created_date,emp_name ,userid, emp_role, branch ]).draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	// var formData = ''
	var relativeUrl = "/user/getAllAccount?branch=" + branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById("employee_type").disabled = false;
	document.getElementById("emp_branch").disabled = false;
	function callback(responseData, textStatus, request) {

		// var message=responseData.response.JSON.message;
		// alert(message);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
	}
	function errorCallback(responseData, textStatus, request) {
		/*
		 * var mes=responseData.responseJSON.message;
		 * showNotification("error",mes);
		 */
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

function createEmployeeAccount() {
	document.getElementById("emp_type").disabled = false;
	document.getElementById("ebranch").disabled = false;
	function callback(responseData, textStatus, request) {

		// var message=responseData.response.JSON.message;
		// alert(message);
//		document.getElementById('emp_type').disabled = true;
//		document.getElementById('branch').disabled = true;
		clearModal();
	}
	function errorCallback(responseData, textStatus, request) {
		/*
		 * var mes=responseData.responseJSON.message;
		 * showNotification("error",mes);
		 */
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	formData = $("#createAc").serialize();
	relativeUrl = "/user/createEmployeeAccount";
	}else{
		formData = $("#createAc").serialize()+"&id="+requestid;
		relativeUrl = "/user/EditEmployeeAccount";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function loadUserAccount(i,e){
	var table = $("#UserMgmt_table").DataTable();
	empname = table.rows({selected : true}).column(2).data()[i];
	username = table.rows({selected : true}).column(3).data()[i];
	role = table.rows({selected : true}).column(4).data()[i];
	$("#enq_taken").val(empname);
	$("#role").val(role);
	document.getElementById("userid").value=empname;
	e.preventDefault();
	$("#datatable-view").hide();
	$("#datatable-view-2").show();
}

function clearModal(){
	$("#enq_taken").val("");
	$("#role").val("");
	document.getElementById("userid").value="";
	requestid=0;
}

function deactivateUserAccount(){
	function callback(responseData, textStatus, request) {

		// var message=responseData.response.JSON.message;
		// alert(message);
		requestid=0;
	}
	function errorCallback(responseData, textStatus, request) {
		/*
		 * var mes=responseData.responseJSON.message;
		 * showNotification("error",mes);*/
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/user/DeactivateAcount?id="+requestid;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
