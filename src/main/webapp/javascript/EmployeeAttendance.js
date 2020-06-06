var mes;
var attendance;
var today;
var time;
$(document).ready(function() {
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes();
	$('#EmpAttendance_table').DataTable({
		"pageLength" : 40
	});

	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAllAbsent").prop("checked", false);
		}
	});

	/*
	 * var options = { // hh:mm 24 hour format only, defaults to current time
	 * twentyFour: false, // Display 24 hour format, defaults to false upArrow:
	 * 'wickedpicker__controls__control-up', downArrow:
	 * 'wickedpicker__controls__control-down', close: 'wickedpicker__close',
	 * hoverState: 'hover-state', showSeconds: false, secondsInterval: 1,
	 * minutesInterval: 1, beforeShow: null, show: null, clearable: false, //
	 * Make the picker's input clearable (has // clickable "x") };
	 */
	// var myPicker = $('.timepicker').wickedpicker(options);
	attendanceList();

	// $('.timepicker').wickedpicker(options);
});

function attendanceList() {
	function callback(responseData, textStatus, request) {
		var table = $("#EmpAttendance_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var present = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var absent = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheckAbs" name="type" value="A"><label for="checkbox1"></label></span>';
			var intime = '<input type="time" name="time" id="intime" class="time" value="'
					+ time + '"/>';
			var outtime = '<input type="time" name="time" id="outitme" class="time" value="'
					+ time + '"/>';
			var emp_code = responseData[i].emp_unq_code;
			var emp_name = responseData[i].emp_name;
			table.row.add(
					[ emp_name, emp_code, present, absent, intime, outtime ])
					.draw();
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
	//var formData = $("#attendance").serialize();
	var relativeUrl = "/Attendance/getEmpAttendaceList?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAttendance() {
	var table = $('#EmpAttendance_table').DataTable();
	var attendance = "0|0";
	$('table .cbCheck').each(
			function(i, chk) {
				if (chk.checked) {
					var code = table.rows({
						selected : true
					}).column(1).data()[i];
					var intime = table.cell(i, 4).nodes().to$().find('input')
							.val();
					var out = table.cell(i, 5).nodes().to$().find('input')
							.val();
					attendance = attendance + "," + code + "|" + intime + "|"
							+ out + "|" + chk.value;
				}
			});
	$('table .cbCheckAbs').each(
			function(i, chk) {
				if (chk.checked) {
					var code = table.rows({
						selected : true
					}).column(1).data()[i];
					var intime = "null";/*table.cell(i, 4).nodes().to$().find('input')
							.val();*/
					var out = "null";/*table.cell(i, 5).nodes().to$().find('input')
							.val();*/
					attendance = attendance + "," + code + "|" + intime + "|"
							+ out + "|" + chk.value;
				}
			});

	saveAttendance(attendance);
}
function saveAttendance(attendance) {
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
	var formData = {
		Attendance : attendance,
		branch : branchSession
	}
	console.log(formData);
	var relativeUrl = "/Attendance/employeeAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}