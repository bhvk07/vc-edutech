var mes;
$(document).ready(function(){
	FetchAllDiv();
	$('#divisiontable').DataTable({
		"pageLength" : 40
	});
	
	$("#division_master").submit(function(){
		InsertDivision();
	});
	
});

function InsertDivision(){
	function callback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("success",mes);
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var formData = $("#division_master").serialize();
	var httpMethod = "POST";
	var relativeUrl = "/Division/NewDivision";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}

function FetchAllDiv(){
	function callback(responseData, textStatus, request) {
		var table = $('#divisiontable').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var div = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var date = responseData[i].created_date;
			var division = responseData[i].division;
			table.row.add([ date, division, div]).draw();
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/Division/DivisionList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}