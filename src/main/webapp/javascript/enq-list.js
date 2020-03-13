$(document).ready(function(){
/*//	var token=$.session.get('token');
//	validateLogin(token);
*/	$('#enq_table').DataTable({
		"pageLength": 40
	});
	showDashboard();
});
function showDashboard(){
	function callback(responseData,textStatus,request){
		var table = $("#enq_table").DataTable();
		var value=0;
		table.rows().remove().draw();
		for (var i in responseData){
		/*value=value+1;
		var check='<span class="custom-checkbox"><input type="checkbox" id="checkbox" name="options[]" value="'+value+'"><label for="checkbox1"></label></span>';*/
		var srno=responseData[i].id;
		var sname=responseData[i].sname;
		var email=responseData[i].email;
		var address=responseData[i].address;
		var stud_cont=responseData[i].stud_cont;
		var button='<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';
		table.row.add(
				[ srno, sname,email,address,stud_cont,button]).draw();
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