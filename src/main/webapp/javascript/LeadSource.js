var mes;
requestid=0;
$(document).ready(function(){
	validateLogin();
	LeadSourceList();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	$('form[id="LeadSourceForm"]').validate({
		  rules: {
			  leadsource: {
		        required: true,
		        lettersonly: true,
		        
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  InsertLeadSource();
		  }
	});
	
	$('#leadsourcetable').DataTable({
		"pageLength" : 40
	});
	$("#editBtn").click(function(e) {		 
		var table = $('#leadsourcetable').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			source = table.rows({selected : true}).column(1).data()[i];
			loadSource(source,e);
			}
		});
	});
	$("#deleteBtn").click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			var idarray=new Array();
			idarray.push($(this).val());
			}
			deleteSource(idarray);
		});
	});
	$("#cancelBtn").click(function() {
		clearModal()
	});
	
});
function InsertLeadSource(){
	function callback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("success",mes);
		clearModal();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	formData = $("#LeadSourceForm").serialize();
	relativeUrl = "/LeadSource/NewSource";
	}else{
		formData = $("#LeadSourceForm").serialize()+"&id="+requestid;
		relativeUrl = "/LeadSource/EditLeadSource";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}
function LeadSourceList(){
	function callback(responseData, textStatus, request){
		var table = $("#leadsourcetable").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var source = responseData[i].source;
			var created_date = responseData[i].created_date;
			
			table.row.add(
					[created_date,source,chck]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/LeadSource/LeadSourceList";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
function loadSource(source,e){
	document.getElementById("leadsource").value=source;
	e.preventDefault();
	$('#leadsourceModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}
function deleteSource(id) {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);	
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/LeadSource/deleteSource?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function clearModal(){
	document.getElementById("leadsource").value="";
	requestid=0;
}