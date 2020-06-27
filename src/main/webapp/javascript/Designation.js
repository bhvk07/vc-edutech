var mes;
var requestid=0;
$(document).ready(function() {
	validateLogin();
	DesignationList();
	
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	$('form[id="designationForm"]').validate({
		
		  rules: {
			  designation_name: {
		        required: true,
		        letterswithspace: true
		   },	
		  },	
		  submitHandler:function(form){
			  event.preventDefault();  
			  event.preventDefault();
			  createDesignation();
		  }
	});

	$("#cancelBtn").click(function() {
		clearModal()
	});
	


});

function createDesignation()
{
	
	function callback(responseData,textStatus,request){
		
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
		clearModal();
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	var formData=$("#designationForm").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Designation/NewDesignation";
	}
	else{
		var formData=$("#designationForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Designation/NewDesignation";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function DesignationList(){
	function callback(responseData, textStatus, request){
		var table = $("#designationTable").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var designation = responseData[i].desg;
			var created_date = responseData[i].created_date;
			
			
			table.row.add(
					[created_date,designation,chck]).draw();
		}
		
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	//var formData = ''
	var relativeUrl = "/Designation/FetchAllDesignation?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
