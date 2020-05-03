//receipt-list.js
$(document).ready(function() {
	showReceiptTable();
	var table = $('#receipt_table').DataTable({
		"pageLength" : 40,
		dom: 'Bfrtip',
	    buttons: [
	    	{extend: 'pdf', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'print', className: 'btn btn-warning glyphicon glyphicon-print'},
	    ],
	    "order": [],
	    "columnDefs": [ {
	    "targets"  : 'no-sort',
	    "orderable": false,
	    }],
	   
	});
	 table.buttons().container()
     .appendTo( '#table-style .col-sm-6:eq(1)' );

	$('.pdf-b').css({
		"font-size" : "13px",
		"padding": "6px 12px",
		"margin-left": "10px"
	});


	
	var myArray = new Array();
	$('#receipt_table tbody tr').on('click', '.cbCheck', function() {
		
		var table = $('#receipt_table').DataTable();
		if (this.checked == true) {
			val = table.row(this.closest('tr')).data();
//			myArray.push(val);
			var rno = val[5];
			
			var receiptno = val[2];
//			myArray.push(rno+"|"+receiptno);
			getVeiwReceiptData(rno, receiptno);
			/*
			 * r_date = val[1]; r_no = val[2]; r_stud = val[3]; r_mob = val[4];
			 * r_in = val[6]; r_amt = val[7];
			 */
		}
//		ReceiptData(myArray);
//		var iterator = myArray.values(); 
//		  
//		// Here all the elements of the array is being printed. 
//		for (let elements of iterator) { 
//		  console.log(elements); 
//		} 
	});
	/*
	 * $("#btn-view").click(function(){ alert("btn");
	 * localStorage.setItem("amount", r_amt); localStorage.setItem("rec_no1",
	 * r_no); localStorage.setItem("stud_name", r_stud);
	 * localStorage.setItem("rec_date", r_date); localStorage.setItem("rec_in",
	 * r_in); });
	 */
});

function showReceiptTable() {
	var table;

	function callback(responseData, textStatus, request) {
		table = $("#receipt_table").DataTable();
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
			// var delbutton = '<a href="#editEmployeeModal" class="edit"
			// data-toggle="modal"><i class="material-icons"
			// data-toggle="tooltip" title="Edit">&#xE254;</i></a><button
			// id="delete" class="delete" onclick="deleterow()" ><i
			// class="material-icons" data-toggle="tooltip"
			// title="Delete">&#xE872;</i></button>';
			table.row.add(
					[ srno, receipt_date, receipt_no, stud_name, contact,
							Rollno, pay_mode, received_amt, received_by,
							trans_date, trans_status ]).draw();

		}
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		alert("failed to load");
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/FetchAllReceiptDetails";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getVeiwReceiptData(rno, receiptno) {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var stud_name = responseData[i].stud_name;
			var receipt_no = responseData[i].receipt_no;
			var received_by = responseData[i].received_by;
			var total_amt = responseData[i].total_amt;
			var received_amt = responseData[i].received_amt;
			var pay_mode = responseData[i].pay_mode;
			var admission = responseData[i].admission;
			var invoice_no = admission.invoice_no;
			var course = admission.adm_fees_pack;
			var total_paid_fees = admission.paid_fees;
			var remain_amt = admission.remain_fees;
		}
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		alert("failed to load");
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/getReceiptAdmissionData?id=" + rno
			+ "&receiptno=" + receiptno;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
/*function ReceiptData(myArray) {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var stud_name = responseData[i].stud_name;
			var receipt_no = responseData[i].receipt_no;
			var received_by = responseData[i].received_by;
			var total_amt = responseData[i].total_amt;
			var received_amt = responseData[i].received_amt;
			var pay_mode = responseData[i].pay_mode;
			var admission = responseData[i].admission;
			var invoice_no = admission.invoice_no;
			var course = admission.adm_fees_pack;
			var total_paid_fees = admission.paid_fees;
			var remain_amt = admission.remain_fees;
		}
	}

	function errorCallback(responseData, textStatus, request) {
		
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 
		alert("failed to load");
	}
	var httpMethod = "GET";
	var formData=myArray;
	console.log(formData);
//	var relativeUrl = "/Receipt/getReceiptAdmissionData?id=" + rno
//			+ "&receiptno=" + receiptno;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

*/