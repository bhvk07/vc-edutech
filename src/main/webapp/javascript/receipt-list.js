var mes;
$(document).ready(function(){
	$('#receipt_table').DataTable({
		"pageLength" : 40
	});
	showReceiptTable();
});

function showReceiptTable(){
	function callback(responseData, textStatus, request) {
		var table = $("#receipt_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var receipt_date = responseData[i].receipt_date;
			var receipt_no = responseData[i].receipt_no;
			var stud_name = responseData[i].stud_name;
			var contact = responseData[i].contact;
			var Rollno = responseData[i].Rollno;
			var pay_mode = responseData[i].pay_mode;
			var received_amt = responseData[i].received_amt;
			var received_by = responseData[i].received_by;
			var trans_date = responseData[i].trans_date;
			var trans_status = responseData[i].trans_status;
			//var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
			table.row.add(
					[ srno, receipt_date, receipt_no, stud_name, contact, Rollno,
						pay_mode, received_amt, received_by, trans_date,trans_status]).draw();
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
	var relativeUrl = "/Receipt/FetchAllReceiptDetails";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}