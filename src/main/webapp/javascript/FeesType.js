var mes;
var requestid=0;
$(document).ready(function() {
	getFeesType();
	$("#feestype").submit(function() {
		// var token=sessionStorage.getItem("token");
		// validateLogin(token);
		//		 
		event.preventDefault();
		addFeesType();
	});
	$("#edit").click(function(e) {		 
		var table = $('#feestypetable').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			feestype = table.rows({selected : true}).column(1).data()[i];
			loadFeesType(feestype,e);
			}
		});
	});
	$("#cancel").click(function() {
		clearModal()
	});

});

function addFeesType() {
	function callback(responseData,textStatus,request)
	{
//		var mes=responseData.responseJSON.message;
//		showNotification("success",mes);
		clearModal();
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	formData =$('#feestype').serialize()+"&branch="+branchSession;
	relativeUrl = "/feesType/addNewFeesType";
	}else{
		formData =$('#feestype').serialize()+"&id="+requestid+"&branch="+branchSession;
		relativeUrl = "/feesType/EditFeesType";
	}
		
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
	var relativeUrl = "/feesType/getFeesType?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function loadFeesType(type,e){
	document.getElementById("feesType").value=type;
	e.preventDefault();
	$('#feestypeModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}

function clearModal(){
	document.getElementById("feesType").value="";
	requestid=0;
}