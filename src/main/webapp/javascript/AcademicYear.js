var mes;
$(document).ready(function(){
	FetchAllAcademic();
	$('#academictable').DataTable({
		"pageLength" : 40
	});

	$("#academicYear").submit(function(){
		InsertYear();
	});
	
});

function InsertYear(){
	
	function callback(responseData, textStatus, request){
		var msg = responseData.responseJSON.message;
		showNotification("success",mes);
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var formData = $("#academicYear").serialize()+"&branch="+branchSession;
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/AcademicYear/NewAcademic";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}

function FetchAllAcademic() {
	function callback(responseData, textStatus, request) {
		var table = $('#academictable').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var academicyear = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var date = responseData[i].created_date;
			var start = responseData[i].start_date;
			var end = responseData[i].end_date;
			var year = responseData[i].aca_year;
			table.row.add([ date, year, start, end, academicyear]).draw();
		}
		
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	//var formData = $("#academicYear").serialize();
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/AcademicList?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
	
}