var aca_year;
var std;
var div;
var sub;
var title;
$(document).ready(function(){
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getSubject();
	$('#div').focusout(function(){
		var aca_year = document.getElementById('ay').value ;
		var std = document.getElementById('std').value ;
		var div = document.getElementById('div').value ;
		var sub = document.getElementById('sub').value ;
		var title = aca_year+"|"+std+"|"+sub+"|"+div;
		document.getElementById('title').value = title;
		
	});
	
//	InsertTimeTable(aca_year,std,div,sub,title);
	
	$("#timetable_table").DataTable({
			"pageLength" : 40
	});
	TimeTableList();
});

function InsertTimeTable(year,standard,div,subject,title){
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
		year : aca_year,
		standard : std,
		division : div,
		subject : sub,
		tt_title : title
		
	};
	var relativeUrl;
	//if(requestid==0){
	//formData = $("#divisionForm").serialize()+"&branch="+branchSession;
	relativeUrl = "/TimeTable/NewTimeTable";
	//}
	//else{
	//	formData = $("#divisionForm").serialize()+"&id="+requestid;
	//	relativeUrl = "/Division/EditDivision";
	//}
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