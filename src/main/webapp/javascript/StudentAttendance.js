var mes;
var attendance;

$(document).ready(function(){
	$('#attendance_table').DataTable({
		"pageLength" : 40
	});
	
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	
	$("#acad_year").keyup(function() {

		attendanceList();
	});

/*	var table = $('#attendance_table').DataTable();
	$('#attendance_table').on('click', 'thead .check', function () {
		console.log("here");
		
	})*/
	$("#saveAttendance").submit(function(){
		alert("here");
		
		/*markAttendance();
		checkbox.click(function() {
			if (this.checked) {
				attendance="P";
			}
			else{
				attendance="A";
			}
		});*/
	});
});

function attendanceList(){
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var attendance = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
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
function getAttendance(){
	var table = $('#attendance_table').DataTable();
	var myArray = new Array();
	var attendance="0|0";
	  $('table .cbCheck').each(function(i, chk) {
		    if (chk.checked==true) {
		    	var rollno = table.rows( { selected: true } ).column(1).data()[i];
		    	 //var rollno=i+1;
		    	 attendance=attendance+","+rollno+"|"+chk.value;
		    }
		    if (!chk.checked) {
		    	var rollno = table.rows( { selected: false } ).column(1).data()[i];
			    	 //var rollno=i+1;
			    	 attendance=attendance+","+rollno+"|A";
//			    	 myArray.push(rollno+"|"+"A");
			    }
		  });
	  //myArray=myArray.sort();
	  var acad_year=document.getElementById("acad_year").value;
	  var course=document.getElementById("courses").value;
	  
	  saveAttendance(acad_year,course,attendance);
}
function saveAttendance(acad_year,course,attendance){
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
	var formData = {acad_year:acad_year,courses:course,Attendance:attendance}
	console.log(formData);
	var relativeUrl = "/Attendance/studentAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


