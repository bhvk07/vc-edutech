$(document).ready(function(){
	fetchLoginHistory();
	$('#loginHistory').DataTable({
		"pageLength" : 40
	});
	
});

function fetchLoginHistory(){
	function callback(responseData, textStatus, request) {
		var table = $('#loginHistory').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var loginTime = responseData[i].timestamp;
			var employee = responseData[i].employee;
			var ip = responseData[i].ip;
			var branch = responseData[i].branch;
			table.row.add([ loginTime, ip, employee, branch]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/user/LoginHistoryList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
