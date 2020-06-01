var mes;
var requestid=0;
$(document).ready(function(){
	FetchAllAcademic();
	$('#academictable').DataTable({
		"pageLength" : 40
	});

	$("#academicYear").submit(function(){
		InsertYear();
	});
	$("#edit").click(function(e){
		$("input:checkbox[name=type]:checked").each(function() {
			requestid=$(this).val();
			loadAcadData(requestid,e);
		});
	});
	$("#cancel").click(function(){
		clearModel();
	});
	
});

function InsertYear(){
	
	function callback(responseData, textStatus, request){
		var msg = responseData.responseJSON.message;
		showNotification("success",mes);
		clearModel();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var formData;
	var relativeUrl;
	var httpMethod = "POST";
	
	if(requestid==0){
	formData = $("#academicYear").serialize()+"&branch="+branchSession;
	relativeUrl = "/AcademicYear/NewAcademic";
	}else{
		formData = $("#academicYear").serialize()+"&id="+requestid+"&branch="+branchSession;
		relativeUrl = "/AcademicYear/editAcademicYear";
	}
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
			var academicyear = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var created_date = responseData[i].created_date;
			var start = responseData[i].start_date;
			var end = responseData[i].end_date;
			var year = responseData[i].aca_year;
			table.row.add([ created_date, year, start, end, academicyear]).draw();
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
function loadAcadData(id,e)
{
	function callback(responseData, textStatus, request) {
		document.getElementById("aca_year").value=responseData.aca_year;
		document.getElementById("aca_start").value=responseData.start_date;
		document.getElementById("aca_end").value=responseData.end_date;
		document.getElementById("prefix_id_card").value=responseData.id_prefix;
		document.getElementById("id_card").value=responseData.id_no;
		document.getElementById("prefix_invoice").value=responseData.invoice_prefix;
		document.getElementById("invoice").value=responseData.invoice;
		document.getElementById("prefix_regno").value=responseData.reg_prefix;
		document.getElementById("regno").value=responseData.registration;
		e.preventDefault();
		$('#academicModal').modal({
		        show: true, 
		        backdrop: 'static',
		        keyboard: true
		     })
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	//var formData = $("#academicYear").serialize();
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/SpecificAcademicData?id="+id+"&branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function clearModel(){
	document.getElementById("aca_year").value="";
	document.getElementById("aca_start").value="";
	document.getElementById("aca_end").value="";
	document.getElementById("prefix_id_card").value="";
	document.getElementById("id_card").value="";
	document.getElementById("prefix_invoice").value="";
	document.getElementById("invoice").value="";
	document.getElementById("prefix_regno").value="";
	document.getElementById("regno").value="";
	requestid=0;
}