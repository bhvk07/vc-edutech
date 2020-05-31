var mes;
var request;
$(document).ready(function() {
	var selected = new Array();
	var table = $("#enq_table").DataTable();
	/*
	 * var token=$.session.get('token'); validateLogin(token);
	 */
	$('#enq_table').DataTable({
		"pageLength" : 40
	});
	$('#btn-danger').click(function() {
		$("input:checkbox[name=type]:checked").each(function() {
			deletemultiplerow($(this).val());
			// selected.push($(this).val());
		});

	});
	$("#admission").click(function() {
		request = "Save";
		var enq_no;
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				enq_no = table.rows({selected : true}).column(2).data()[i];
				
			}
		});
		Admission(enq_no, request);
	});
	$("#Edit").click(function() {
		request = "Edit";
		var enq_no;
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				enq_no = table.rows({selected : true}).column(2).data()[i];
			}
		});
		Admission(enq_no, request);
	});
	showDashboard();
});
function showDashboard() {
	function callback(responseData, textStatus, request) {
		var table = $("#enq_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var enq_date = responseData[i].enq_date;
			var enq_no = responseData[i].enq_no;
			var sname = responseData[i].sname;
			var stud_cont = responseData[i].stud_cont;
			var address = responseData[i].address;
			var enq_taken_by = responseData[i].enq_taken_by;
			var lead_stage = "";
			var lead_source = responseData[i].lead_source;
			var status = responseData[i].status;
			var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
			table.row.add(
					[ srno, enq_date, enq_no, sname, stud_cont, address,
							enq_taken_by, lead_stage, lead_source, status,
							delbutton ]).draw();
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
	var relativeUrl = "/Enquiry/FetchAllEnquiryData?branch=" + branchSession;

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function deleterow() {

	var id = $('.cbCheck:checked').val();
	function callback(responseData, textStatus, request) {
		alert("data deleted");
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/Enquiry/DeleteEnquiryData?delete=" + id;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function deletemultiplerow(id) {
	function callback(responseData, textStatus, request) {
		alert("data deleted");
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/Enquiry/DeleteMultipleEnquiryData?delete=" + id;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function Admission(id, req) {
	function callback(responseData, textStatus, request) {
		var enqData = new Array();
		var today = new Date();
		var studentDetails = id + "|" + responseData.sname + " "
				+ responseData.fname + " " + responseData.lname + "|"
				+ responseData.stud_cont;

		enqData.push(responseData.fname);
		enqData.push(responseData.lname);
		enqData.push(responseData.mname);
		enqData.push(responseData.uid);
		enqData.push(responseData.dob);
		enqData.push(responseData.gender);
		enqData.push(responseData.caste);
		enqData.push(responseData.category);
		enqData.push(responseData.lang);
		/* enqData.push(responseData.stud_cont); */
		enqData.push(responseData.father_cont);
		enqData.push(responseData.mother_cont);
		enqData.push(responseData.address);
		enqData.push(responseData.pin);
		enqData.push(responseData.email);
		enqData.push(responseData.w_app_no);
		enqData.push(responseData.sname);
		enqData.push(responseData.stud_cont);
		enqData.push(responseData.enq_date);
		enqData.push(responseData.enq_no);
		enqData.push(responseData.enq_taken_by);
		enqData.push(responseData.lead_source);
		enqData.push(responseData.remark);
		enqData.push(responseData.fees_pack);
		enqData.push(responseData.branch);
		if (req == "Edit") {
			sessionStorage.setItem("EditData", enqData);
			window.location.href = "enquiry.html";
		} else {
			alert("here1");
			var feespack = responseData.fees_pack;
			var installment = "installment details,0|ActivityFees|0";
			var newAmt = "0";
			var enq_taken = localStorage.getItem("user");
			var date = today.getFullYear() + "-" + today.getMonth() + "-"
					+ today.getDate();
			var status = "active";
			var acad_data = getIncrementalData();
			var acad_year = acad_data[0];
			var id_no = acad_data[1] + "-" + acad_data[2];
			var invoice_no = acad_data[3] + "-" + acad_data[4];
			var reg_no = acad_data[5] + "-" + acad_data[6];
			StudentAdmission(studentDetails, enq_taken, feespack, status, date,
					id_no, reg_no, invoice_no, date, acad_year, date, enqData,
					installment, newAmt, branchSession);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		alert("admission not done");
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id=" + id + "&branch="
			+ branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getIncrementalData() {
	var acad_data;
	function callback(responseData, textStatus, request) {
		acad_data = new Array();
		acad_data.push(responseData.aca_year);
		acad_data.push(responseData.id_prefix);
		acad_data.push(responseData.id_no);
		acad_data.push(responseData.invoice_prefix);
		acad_data.push(responseData.invoice);
		acad_data.push(responseData.reg_prefix);
		acad_data.push(responseData.registration);
	}
	function errorCallback(responseData, textStatus, request) {
		alert("admission not done");
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAutoIncrementedDetails?branch="
			+ branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return acad_data;
}

function StudentAdmission(studentDetails, enq_taken, feespack, status, date,
		id_no, reg_no, invoice_no, date, acad_year, date, enqData, installment,
		newAmt, branchSession) {
	function callback(responseData, textStatus, request) {
		alert("done");
	}
	function errorCallback(responseData, textStatus, request) {
		alert("admission not done");
	}
	formData = "stud_details=" + studentDetails + "&enq_taken_by=" + enq_taken
			+ "&adm_fees_pack=" + feespack + "&status=" + status + "&date="
			+ date + "&Rollno=" + id_no + "&regno=" + reg_no + "&invoice_no="
			+ invoice_no + "&admission_date=" + date + "&acad_year="
			+ acad_year + "&join_date=" + date + "&personalDetails=" + enqData
			+ "&installment=" + installment + "&newAmt=" + newAmt + "&branch="
			+ branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
