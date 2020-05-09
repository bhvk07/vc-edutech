var mes;
var attendance;

$(document).ready(function(){
	$('#EmpAttendance_table').DataTable({
		"pageLength" : 40
	});
	
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	
	
	var options = {
			   //hh:mm 24 hour format only, defaults to current time
			  twentyFour: false, //Display 24 hour format, defaults to false
			  upArrow: 'wickedpicker__controls__control-up', 
			  downArrow: 'wickedpicker__controls__control-down', 
			  close: 'wickedpicker__close', 
			  hoverState: 'hover-state',  
			  showSeconds: false, 
			  secondsInterval: 1, 
			  minutesInterval: 1, 
			  beforeShow: null,
			  show: null, 
			  clearable: false, //Make the picker's input clearable (has clickable "x")
			}; 

			//var myPicker = $('.timepicker').wickedpicker(options);
		attendanceList();
	
		$('.timepicker').wickedpicker(options);

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
		var table = $("#EmpAttendance_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var attendance = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var intime = '<input type="text" name="timepicker" id="intime" class="timepicker"/>';
			var outtime = '<input type="text" name="timepicker" id="outitme" class="timepicker"/>';
			//var date = responseData[i].currentDate;
			var emp_code = responseData[i].emp_unq_code;
			var emp_name = responseData[i].emp_name;
			//var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
			table.row.add(
					[emp_name, emp_code, attendance, intime, outtime]).draw();
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
	var httpMethod = "GET";
	var formData = $("#attendance").serialize();
	var relativeUrl = "/Attendance/getEmpAttendaceList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
/*
 * function getAttendance(){
	var table = $('#attendance_table').DataTable();
	var myArray = new Array();
	var attendance="0|0";
	  $('table .cbCheck').each(function(i, chk) {
		    if (chk.checked==true) {
		    	 var data = table.rows(i).data();
		    	 var rollno=i+1;
		    	 attendance=attendance+","+rollno+"|"+chk.value;
		    }
		    if (!chk.checked) {
			    	 var data = table.rows(i).data();
			    	 var rollno=i+1;
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
		
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 

	}

	function errorCallback(responseData, textStatus, request) {
		
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 
	}
	
	var httpMethod = "POST";
	var formData = {acad_year:acad_year,courses:course,Attendance:attendance}
	console.log(formData);
	var relativeUrl = "/Attendance/studentAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

*/
