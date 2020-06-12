var aca_year;
var std;
var div;
var sub;
var title;
var start;
var end;
var slot;
$(document).ready(function(){
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getSubject();
	$('#multi_time').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#div').focusout(function(){
		var aca_year = document.getElementById('ay').value ;
		var std = document.getElementById('std').value ;
		var div = document.getElementById('div').value ;
		var sub = document.getElementById('sub').value ;
		var title = aca_year+"|"+std+"|"+sub+"|"+div;
		document.getElementById('title').value = title;
		
	});
	
	$('#end_time').focusout(function(){
		var start = document.getElementById('start_time').value ;
		var end = document.getElementById('end_time').value ;
		var slot = start+"-"+end;
		document.getElementById('time_slot').value = slot ;
	});
	$('#add').click(function(){
		getTimeTableDetails();
		//InsertTimeSlot(slot);
	});
	
//	InsertTimeTable(aca_year,std,div,sub,title);
	
	$("#timetable_table").DataTable({
			"pageLength" : 40
	});
	TimeTableList();
});
function getTimeTableDetails(){
	var table=document.getElementById("tt");
	var rowCount=$('#tt tr').length;
	var tt_details="tt details";
	for (var i = 1; i < rowCount; i++) {
			var date = $(table.rows.item(i).cells[0]).find('select').val();
			var time = $(table.rows.item(i).cells[1]).find('select').val();
			var lecturer = $(table.rows.item(i).cells[2]).find('select').val();
			var status = $(table.rows.item(i).cells[3]).find('select').val();
			tt_details+="$"+date+"|"+time+"|"+lecturer+"|"+status;
			}
	InsertTimeTable(tt_details);
}	
function InsertTimeTable(tt_details){
	function callback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("success",mes);
		//clearModal();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "POST";
	var formData=$("#time-table").serialize()+"&tt_details="+tt_details+"&branch="+branchSession;
	alert(formData);
	var relativeUrl;
	relativeUrl = "/TimeTable/NewTimeTable";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}
function TimeTableList(){
	function callback(responseData, textStatus, request){
		var table = $("#timetable_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var subject = responseData[i].subject;
			var created_date = responseData[i].created_date;
			var year = responseData[i].aca_year;
			var div = responseData[i].division;
			//var std = responseData[i].std;
			var title = responseData[i].title;
			
			table.row.add(
					[created_date,title,year,div,subject,chck]).draw();
		}
		
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	//var formData = ''
	var relativeUrl = "/TimeTable/FetchTimeTable";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}


function InsertTimeSlot(slot){
	function callback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("success",mes);
		//clearModal();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "POST";
	var formData={
		timeslot : slot
	};
	var relativeUrl;
	//if(requestid==0){
	//formData = $("#divisionForm").serialize()+"&branch="+branchSession;
	relativeUrl = "/TimeSlot/InsertTimeSlot";
	//}
	//else{
	//	formData = $("#divisionForm").serialize()+"&id="+requestid;
	//	relativeUrl = "/Division/EditDivision";
	//}
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}