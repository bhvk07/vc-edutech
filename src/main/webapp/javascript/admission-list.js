var mes;
var branchSession=sessionStorage.getItem("branch");
$(document).ready(function(){
	var info;
    $('#admission_table').DataTable({
		"pageLength" : 40,
		"stateSave" : true
		/*"initComplete": function (settings, json) {//here is the tricky part 
			info = $('#admission_table tbody tr').length;
			
	        }*/
	});
	showAdmissionTable();
	
	//show_rows1();
	
	
});

function showAdmissionTable(){
	function callback(responseData, textStatus, request) {
	    var table = $("#admission_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var date = responseData[i].date;
			var student_name = responseData[i].student_name;
			var invoice_no = responseData[i].invoice_no;
			var Rollno = responseData[i].Rollno;
			var regno = responseData[i].regno;
			var contact = responseData[i].contact;
			var adm_fees_pack = responseData[i].adm_fees_pack;
			var acad_year = responseData[i].acad_year;
			var status = responseData[i].status;
			var enq_taken_by = responseData[i].enq_taken_by;
			var fees = responseData[i].fees;
			var paid_fees = responseData[i].paid_fees;
			var remain_fees = responseData[i].remain_fees;
			//var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
			table.row.add(
					[srno,date, student_name, invoice_no, Rollno, regno, contact,
						adm_fees_pack, acad_year, status, enq_taken_by,fees,
						paid_fees,remain_fees]).draw();
		}
		//console.log(table.row(0).data());
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
	var relativeUrl = "/Admission/FetchAllAdmittedStudent?branch="+branchSession;

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}



/*function show_rows(){
	var ro = table.rows();
	//alert(ro);
	var cnt = table.rows().data();
	//alert("len"+cnt.cells.length);
	rw = table.data().length; // output is 8
	var arr = [];
	cnt.each(function(value,index){
		arr.push(value); //output is al values with html tags
	});
	alert(arr);
	alert("cells"+table.rows().cells().length);
	var json = [];
	var headers = [];
	for (var i = 0; i < arr.cells.length; i++) {
		  headers[i] = arr[i];
		  //alert("head"+headers[i]);
		}
	
	for (var i = 1; i < rw; i++) {
		  var tableRow = arr[i];
		  
		  var rowData = {};
		  for (var j = 0; j < tableRow.cells().length; j++) {
		    rowData[headers[j]] = tableRow.cells[j].innerHTML;
		    //alert("rowdata"+ rowdata);
		  }

		  json.push(rowData);
		}
	alert("json"+json);
	//localStorage.setItem("count",cnt);
	cnt.each(function(){
		
	});
	
	
	alert(cnt);
}
*/