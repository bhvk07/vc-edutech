$(document).ready(function(){
	getBranch();
	$("#branch-form").submit(function(){
		addNewBranch();
	});
});

function addNewBranch(){
	function callback(responseData, textStatus, request){
		var msg = responseData.responseJSON.message;
		showNotification("success",mes);

	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var formData = $("#branch-form").serialize()+"&createdBy="+user;
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/branch/addNewBranch";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getBranch(){
	function callback(responseData, textStatus, request){
		var table = $('#branchtable').DataTable();
		var value = 0;
		table.rows().remove().draw();
			var check = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var date = responseData.Created_Date;
			var Branch = responseData.Branch;
			var BranchCode = responseData.BranchCode;
			table.row.add([ date, Branch, BranchCode, check]).draw();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}