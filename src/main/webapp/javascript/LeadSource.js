var mes;
requestid=0;
$(document).ready(function(){
	$("#LeadSourceForm").submit(function(){
		InsertLeadSource();
});
	LeadSourceList();
	$('#leadsourcetable').DataTable({
		"pageLength" : 40
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
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
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
	//var formData = ''
	var relativeUrl = "/LeadSource/LeadSourceList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}