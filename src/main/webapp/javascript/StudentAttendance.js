var mes;
var attendance;
var std;
var acad_year;

$(document).ready(function() {
	getAllStandard();
	$('#attendance_table').DataTable({
		"pageLength" : 40
	});

	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	var select=document.getElementById("standard");
	select.addEventListener('change', function() {
		std=document.getElementById("standard").value;
		document.getElementById('acad_year').disabled = false;
		acad_year=document.getElementById("acad_year").value;
		document.getElementById('acad_year').disabled = true;
		attendanceList(std,acad_year)
	});

});
function getAllStandard() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].standard + '" >'
					+ responseData[i].standard + '</option>';
			$('#standard').append(htmlCode);
		}

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/standard/getAllStandard?branch=" + branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function attendanceList(std,acad_year) {
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var attendance = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var date = responseData[i].currentDate;
			var Rollno = responseData[i].RollNo;
			var student_name = responseData[i].Name;
			table.row.add([ date, Rollno, student_name, attendance ]).draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {standard : std , acad_year : acad_year, branch : branchSession};
	var relativeUrl = "/Attendance/getAttendaceList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getAttendance() {
	var table = $('#attendance_table').DataTable();
	var myArray = new Array();
	var attendance = "0|0";
	$('table .cbCheck').each(function(i, chk) {
		if (chk.checked == true) {
			var rollno = table.rows({
				selected : true
			}).column(1).data()[i];
			// var rollno=i+1;
			attendance = attendance + "," + rollno + "|" + chk.value;
		}
		if (!chk.checked) {
			var rollno = table.rows({
				selected : false
			}).column(1).data()[i];
			// var rollno=i+1;
			attendance = attendance + "," + rollno + "|A";
			// myArray.push(rollno+"|"+"A");
		}
	});
	// myArray=myArray.sort();

	saveAttendance(std, acad_year, attendance);
}
function saveAttendance(standard, acad_year, attendance) {
	function callback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
	}
	var httpMethod = "POST";
	console.log(attendance);
	var formData = {
		standard : standard,
		acad_year : acad_year,
		Attendance : attendance,
		branch : branchSession
	}
	console.log(formData);
	var relativeUrl = "/Attendance/studentAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
