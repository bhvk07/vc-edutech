var mes;
var requestid=0;
var vendors = new Array();
$(document).ready(function(){
	loadvendor();
	fetchAllBranch();
	$("#branch").val(branchSession);
	$('#multi_vendor_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#expense_report').DataTable({
		"pageLength" : 40
	});
	
	$("#getExpenseData").submit(function(e){
		alert("success");
		getExpenseReport(e);
	});
});
function loadvendor() {
	function callback(responseData, textStatus, request) {
		alert("succ");
		for ( var i in responseData) {
			vendors.push('<option value="' + responseData[i].vendor + '" >'
							+ responseData[i].vendor + '</option>');
		}
		for (var i = 0; i < vendors.length; i++) {
			$('.vendor_list').append(vendors[i]);
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}

	var httpMethod = "GET";
	var relativeUrl = "/Expense/LoadVendor";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getExpenseReport(e) {
	
	function callback(responseData, textStatus, request) {
		var table = $("#expense_report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			alert("in");
			var edate = responseData[i].exp_date;
			alert(edate);
			var ven = responseData[i].vend;
			var amt = responseData[i].amt;
			
			table.row.add([edate, ven, amt]).draw();
			
		}

	}

	function errorCallback(responseData, textStatus, request) {
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
	}
	var httpMethod = "POST";
	var formData = $("#getExpenseData").serialize();
	var relativeUrl = "/Expense/ExpenseReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}