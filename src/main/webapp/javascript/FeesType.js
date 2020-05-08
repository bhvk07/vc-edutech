var mes;
$(document).ready(function() {
	getFeesType();
	$("#feestype").submit(function() {
		// var token=sessionStorage.getItem("token");
		// validateLogin(token);
		//		 
		event.preventDefault();
		addFeesType();
	});

});

function addFeesType() {
	function callback(responseData,textStatus,request)
	{
//		var mes=responseData.responseJSON.message;
//		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData=$('#feestype').serialize();
	var relativeUrl = "/feesType/addNewFeesType";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}

function getFeesType() {
	function callback(responseData,textStatus,request)
	{
		 var table = $("#feestypetable").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
						+ responseData[i].id
						+ '"><label for="checkbox1"></label></span>';
				var createdDate = responseData[i].createdDate;
				var feesType = responseData[i].feesType;
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
						[createdDate,feesType, srno]).draw();
			}
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/feesType/getFeesType";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;
	
}