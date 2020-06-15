var mes;
$(document).ready(function(){
	showAdmissionTable();
    $('#admission_table').DataTable({
		"pageLength" : 40,
		"stateSave" : true,
		dom: 'Bfrtip',
    });
    var table = $('#admission_table').DataTable({
    buttons: [
	    	{extend: 'pdf', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'print', className: 'btn btn-warning glyphicon glyphicon-print'},
	    	{extend: 'excel', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'csv', className: 'btn btn-warning glyphicon glyphicon-print'},
	    ],
	    "order": [],
	    "columnDefs": [ {
	    "targets"  : 'no-sort',
	    "orderable": false,
	    }]
    });

    table.buttons().container().appendTo( '#table-style .col-sm-6:eq(1)' );
	
	
$('#admission_table tbody tr').on('click', '.cbCheck', function() {
		
		var table = $('#admission_table').DataTable();
		if (this.checked == true) {
			val = table.row(this.closest('tr')).data();
			var rno = val[4];
			getStudReceiptList(rno);	
		}
	});
$('#Edit').click(function() {
	$('table .cbCheck').each(function(i,chk){
	if (chk.checked) {
		var id = $(this).val();
		getAdmissionDetailsOfSpecificStudent(id);
		}
	});	
});
$('#Viewbtn').click(function(e) {
	$('table .cbCheck').each(function(i,chk){
	if (chk.checked) {
		var id = $(this).val();
		getInvoiceOfSpecificStudent(id,e);
		}
	});	
});
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
			console.log(student_name);
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

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}


function getStudReceiptList(rno){
	function callback(responseData, textStatus, request) {
	    var table = $("#StudReceiptList_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var rec_date = responseData[i].receipt_date;
			var rec_no = responseData[i].receipt_no;
			var student_name = responseData[i].stud_name;
			var pay_mode = responseData[i].pay_mode;
			var total = responseData[i].total_amt;
			var viewbtn = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
				+ responseData[i].id
				+ '"><label for="checkbox1"></label></span>';
			table.row.add(
			[rec_date,rec_no,student_name,pay_mode,total,viewbtn]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/getStudReceiptList?id=" + rno;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getAdmissionDetailsOfSpecificStudent(id){
	var admissionData;
	function callback(responseData, textStatus, request) {
		admissionData=new Array();
		admissionData.push(responseData.id);
		admissionData.push(responseData.student_name);
		admissionData.push(responseData.lname);
		admissionData.push(responseData.fname);
		admissionData.push(responseData.contact);
		admissionData.push(responseData.enq_taken_by);
		admissionData.push(responseData.adm_fees_pack);
		admissionData.push(responseData.status);
		admissionData.push(responseData.date);
		admissionData.push(responseData.Rollno);
		admissionData.push(responseData.regno);
		admissionData.push(responseData.division);
		admissionData.push(responseData.invoice_no);
		admissionData.push(responseData.admission_date);
		admissionData.push(responseData.acad_year);
		admissionData.push(responseData.join_date);
		var feesData=responseData.feesDetails.split(",");
		var feesDetails="feesDetails";
		for(var i=0;i<feesData.length;i++){
			feesDetails+="-"+feesData[i];
		}
		admissionData.push(feesDetails);
		admissionData.push(responseData.fees);
		var installment=responseData.installment;
		
		//var monthly=installment.monthly_pay.split(",");
		var monthlypay="monthlypay";
		for(var i=0;i<installment.monthly_pay.length;i++){
			monthlypay+="-"+installment.monthly_pay[i];
		}
		
		//var due=installment.due_date.split(",");
		var due_date="due_date";
		for(var i=0;i<installment.due_date.length;i++){
			due_date+="-"+installment.due_date[i];
		}
		
		//var title=installment.fees_title.split(",");
		var fees_title="fees_title";
		for(var i=0;i<installment.fees_title.length;i++){
			fees_title+="-"+installment.fees_title[i];
		}
		admissionData.push(monthlypay);
		admissionData.push(due_date);
		admissionData.push(fees_title);
		sessionStorage.setItem("admission",admissionData);
		window.location.href = "admission.html";
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAdmissionDetailsOfSpecificStudent?id=" + id + "&branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getInvoiceOfSpecificStudent(id,e){
	
	function callback(responseData, textStatus, request) {
		e.preventDefault();
		var no=0;
		var feesDetails=responseData.feesDetails.split(",");
		for(var i=0;i<feesDetails.length;i++){
			var individualFeesDetails=feesDetails[i].split("|");
				no+=1
				var tableRow='<tr><td class="no">'+no+'</td><td class="text-left"><h3><a target="_blank" href="#">'+individualFeesDetails[0]+'</a></h3></td><td class="unit">'+individualFeesDetails[1]+'</td><td class="qty">'+individualFeesDetails[2]+'</td><td class="total">'+individualFeesDetails[3]+'</td></tr>';
				$("#invoice_table tbody").append(tableRow);
		}
		var tableFooterRow='<tr><td colspan="2"></td><td colspan="2">Total Discount</td><td>'+responseData.disccount+'</td></tr><tr><td colspan="2"></td><td colspan="2">Grand Total</td><td>'+responseData.fees+'</td></tr><tr><td colspan="2"></td><td colspan="2">Payment</td><td>'+responseData.paid_fees+'</td></tr><tr><td colspan="2"></td><td colspan="2">Balance Due</td><td>'+responseData.remain_fees+'</td></tr>';
		$("#invoice_table tfoot").append(tableFooterRow);
		var branchDetails=getInvoiceBranchDetails();
		document.getElementById("company_name").innerHTML = branchDetails[0];
		document.getElementById("company_address").innerHTML = branchDetails[1];
		document.getElementById("invoice_no").innerHTML ="INVOICE NO : " +responseData.invoice_no;
		document.getElementById("invoice_to").innerHTML ="INVOICE TO : "+responseData.student_name+" "+responseData.fname+" "+responseData.lname;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAdmissionDetailsOfSpecificStudent?id=" + id + "&branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getInvoiceBranchDetails(){
	var branchDetails=new Array();
	function callback(responseData, textStatus, request){
		branchDetails.push(responseData.Branch);
		branchDetails.push(responseData.Address);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return branchDetails;
}