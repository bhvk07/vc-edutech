var mes;
$(document).ready(function(){
	$('#attendance_table').DataTable({
		"pageLength" : 40
	});
	$("#acad_year").keyup(function() {

		attendanceList();
	});
});

function attendanceList(){
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var attendance = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var date = responseData[i].currentDate;
			var Rollno = responseData[i].RollNo;
			var student_name = responseData[i].Name;
			//var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
			table.row.add(
					[date, Rollno, student_name,attendance]).draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "POST";
	var formData = $("#attendance").serialize();
	var relativeUrl = "/Attendance/getAttendaceList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}