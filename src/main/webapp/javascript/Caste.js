var mes;
var requestid=0;
$(document).ready(function() {
	getCaste();
	$("#caste-form").submit(function() {
		event.preventDefault();
		addCaste();
	});
	$("#edit").click(function(e) {		 
		var table = $('#caste-table').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			caste = table.rows({selected : true}).column(1).data()[i];
			loadCaste(caste,e);
			}
		});
	});
	$("#cancel").click(function() {
		clearModal()
	});

});

function addCaste() {
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
	formData =$('#caste-form').serialize()+"&branch="+branchSession;
	relativeUrl = "/caste/addNewCaste";
	}else{
		formData =$('#caste-form').serialize()+"&id="+requestid;
		relativeUrl = "/caste/EditCaste";
	}
		
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}

function getCaste() {
	function callback(responseData,textStatus,request)
	{
		 var table = $("#caste-table").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
						+ responseData[i].id
						+ '"><label for="checkbox1"></label></span>';
				var createdDate = responseData[i].Created_Date;
				var caste = responseData[i].Caste;
				//var delbutton = '<a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><button id="delete" class="delete" onclick="deleterow()" ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>';
				table.row.add(
						[createdDate,caste, srno]).draw();
			}
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/caste/getCaste?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function loadCaste(caste,e){
	alert(caste);
	document.getElementById("caste").value=caste;
	e.preventDefault();
	$('#CasteModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}

function clearModal(){
	document.getElementById("caste").value="";
	requestid=0;
}