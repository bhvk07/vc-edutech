var requestid=0;
var date;
$(document).ready(function() {
	validateLogin();
	TimeTableList();
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getSubject();
	$("#timetable_table").DataTable({
		"pageLength" : 40
	});
	
	$('#div').focusout(function() {
		var aca_year = document.getElementById('acad_year').value;
		var std = document.getElementById('std').value;
		var div = document.getElementById('div').value;
		var sub = document.getElementById('sub').value;
		var title = aca_year + "|" + std + "|" + sub + "|" + div;
		document.getElementById('title').value = title;

	});

	$('#end_time').focusout(function() {
		var start = document.getElementById('start_time').value;
		var end = document.getElementById('end_time').value;
		var slot = start + "-" + end;
		document.getElementById('time_slot').value = slot;
	});
	$('#time_slot_new').submit(function(e) {
		e.preventDefault();
		 InsertTimeSlot();
	});
	$('#add').click(function() {
		getTimeTableDetails();
	});
	$('#edit').click(function(e) {
		removeTableRow();
		var created_date,title;
		var table = $("#timetable_table").DataTable();
		  $('table .cbCheck').each(function(i, chk) { 
			  if (chk.checked==true) {
				  requestid=1; 
				  created_date=table.rows({selected :true}).column(0).data()[i]; 
				  title=table.rows({selected :true}).column(1).data()[i]; 
			  }
		  });
		  e.preventDefault();
		  loadTimeTable(created_date,title);
	});
	$('#delete').click(function(e) {
		var created_date,title;
		var table = $("#timetable_table").DataTable();
		  $('table .cbCheck').each(function(i, chk) { 
			  if (chk.checked==true) {
				  created_date=table.rows({selected :true}).column(0).data()[i]; 
				  title=table.rows({selected :true}).column(1).data()[i]; 
			  }
		  });
		  e.preventDefault();
		  deleteTimeTable(created_date,title);
	});
	$('#tt').on('click','.remove-row',function(e) {
				$(this).closest('tr').remove();
		});
});
function getTimeTableDetails() {
	var table = document.getElementById("tt");
	var rowCount = $('#tt tr').length;
	var tt_details = "tt details";
	for (var i = 1; i < rowCount; i++) {
		var date = $(table.rows.item(i).cells[0]).find('select').val();
		var time = $(table.rows.item(i).cells[1]).find('select').val();
		var lecturer = $(table.rows.item(i).cells[2]).find('select').val();
		var status = $(table.rows.item(i).cells[3]).find('select').val();
		tt_details += "$" + date + "|" + time + "|" + lecturer + "|" + status;
	}
	InsertTimeTable(tt_details);
}
function InsertTimeTable(tt_details) {
	function callback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("success", mes);

	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}
	var httpMethod = "POST";
	var relativeUrl;
	var formData;
	if(requestid==0){
		formData = $("#time-table").serialize() + "&tt_details=" + tt_details
		+ "&branch=" + branchSession;
		relativeUrl = "/TimeTable/NewTimeTable";
	}else{
		formData = $("#time-table").serialize() + "&tt_details=" + tt_details+"&created_date=" + date
		+ "&branch=" + branchSession;
		relativeUrl = "/TimeTable/EditTimeTable";
	}
	alert(formData);
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;

}
function TimeTableList() {
	function callback(responseData, textStatus, request) {
		var table = $("#timetable_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value=""><label for="checkbox1"></label></span>';
			var created_date = responseData[i].created_date;
			var title = responseData[i].title;
			var pipeSeperated=title.split("|");
			var subject = pipeSeperated[2];
			var year = pipeSeperated[0];
			var div = pipeSeperated[3];
			table.row.add([ created_date, title, year, div, subject, chck ])
					.draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	var relativeUrl = "/TimeTable/FetchTimeTable?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function InsertTimeSlot() {
	function callback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("success", mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = $("#time_slot_new").serialize()+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/InsertTimeSlot";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function loadTimeTable(created_date,title){
	function callback(responseData, textStatus, request) {
		var j=0;
		var table = document.getElementById("tt");
		var html = '<tr><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" name="day" style="width:100%;"><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option><option value="sunday">Sunday</option></select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group" style="width:100%"><select id="multi_time" class="form-control" name="time-slot" style="width:100%;">'
			+ htmlCode 
			+ '</select><span class="input-group-btn"><button class="btn btn-primary" id="add-btn" type="button" data-toggle="modal" data-target="#addTimeModal"><span class="glyphicon glyphicon-plus"></span></button></span></div></div></div></td><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" id="lecturer" name="lecturer" style="width:100%;">'
			+ lecturers
			+ '</select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group"><select class="form-control" name="status" style="width:100%;"><option>active</option><option>inactive</option></select></div></div></div></td><td><div class="col-md-2 lesspadding"><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row" class="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></div></td></tr>';
		for (var k = 0; k < responseData.length - 1; k++) {
			$("#tt").append(html);
		}
		for(var i in responseData){
			$("#acad_year").val(responseData[i].aca_year);
			$("#std").val(responseData[i].std);
			$("#sub").val(responseData[i].subject);
			$("#div").val(responseData[i].division);
			$("#title").val(responseData[i].title);
			date=responseData[i].created_date;
			$(table.rows.item(j + 1).cells[0]).find('select').val(responseData[i].day);
			$(table.rows.item(j + 1).cells[1]).find('select').val(responseData[i].time_slot);
			$(table.rows.item(j + 1).cells[2]).find('select').val(responseData[i].lecturer);
			$(table.rows.item(j + 1).cells[3]).find('select').val(responseData[i].status);
			j=j+1;
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = "&created_date="+created_date+"&title="+title+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/getSpecificTimeTable";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function deleteTimeTable(created_date,title){
	function callback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("success", mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = "&created_date="+created_date+"&title="+title+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/deleteTimeTable";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function removeTableRow(){
	var table = document.getElementById("tt");
	var rowCount = table.rows.length;
	alert(rowCount);
	var i = 2;
	while (rowCount > i) {
		document.getElementById("tt").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
}