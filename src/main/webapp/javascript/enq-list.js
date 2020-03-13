$(document).ready(function(){
/*//	var token=$.session.get('token');
//	validateLogin(token);
*/	$('#enq_table').DataTable({
		"pageLength": 40
	});
	$(".delete").click(function(){
	deleterow();	
	});
	showDashboard();
});
function showDashboard(){
	function callback(responseData,textStatus,request){
		var table = $("#enq_table").DataTable();
		var value=0;
		table.rows().remove().draw();
		for (var i in responseData){
		var srno='<span class="custom-checkbox"><input type="checkbox" id="checkbox" name="options[]" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
		var enq_date=responseData[i].enq_date;
		var enq_no=responseData[i].enq_no;
		var sname=responseData[i].sname;
		var stud_cont=responseData[i].stud_cont;
		var address=responseData[i].address;
		var enq_taken_by=responseData[i].enq_taken_by;
		var lead_stage="";
		var lead_source=responseData[i].lead_source;
		var status="";
		var button='<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';
		table.row.add(
				[ srno, enq_date,enq_no,sname,stud_cont,address,enq_taken_by,lead_stage,lead_source,status,button]).draw();
		}
	}
	
	function errorCallback(responseData,textStatus,request){
/*		var message=responseData.responseJSON.message;
		showNotification("error",message);*/
		alert("failed to load");
	}
	var httpMethod="GET";
	var relativeUrl="/Enquiry/FetchAllEnquiryData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function deleterow(){
	var id=document.getElementById("checkbox");
	alert(id);
	function callback(responseData,textStatus,request){
	
		}
	
	function errorCallback(responseData,textStatus,request){
/*		var message=responseData.responseJSON.message;
		showNotification("error",message);*/
		alert("failed to delete");
	}
	var httpMethod="DELETE";
	var relativeUrl="/Enquiry/DeleteEnquiryData?delete="+id;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}