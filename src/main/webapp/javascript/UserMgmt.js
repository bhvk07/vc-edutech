var mes;
var branchSession = sessionStorage.getItem("branch");
$(document).ready(function() {
	$('#UserMgmt_table').DataTable({
		"pageLength" : 40
	});
	fetchAllBranch();
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	EmployeeList();
	console.log(branchSession);
	$(".branch").val(branchSession);
	$("#btnSave").click(function() {
		event.preventDefault();
		createEmployeeAccount();
	});
});

function EmployeeList() {
	function callback(responseData, textStatus, request) {
		var table = $("#UserMgmt_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var emp_role = responseData[i].role;
			var id = responseData[i].created_date;
			var emp_id = responseData[i].userid;
			var branch = responseData[i].branch;
			table.row.add([ chck, id, emp_id, emp_role, branch ]).draw();

			var htmlCode = '<option value="' + responseData[i].emp_name + '" >'
					+ responseData[i].emp_name + '</option>';
			$('#emp_name').append(htmlCode);
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	// var formData = ''
	var relativeUrl = "/Employee/FetchAllEmployee?branch=" + branchSession;
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
	}
	function errorCallback(responseData, textStatus, request) {
		/*
		 * var mes=responseData.responseJSON.message;
		 * showNotification("error",mes);
		 */
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#createAc").serialize();
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Employee/createEmployeeAccount";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
