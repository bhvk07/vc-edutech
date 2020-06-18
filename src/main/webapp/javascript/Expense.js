var mes;
var requestid=0;
var vendors = new Array();
$(document).ready(function(){
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate >= now;
	});
	$('form[id="ExpenseForm"]').validate({
		  rules: {
			exp_date:{
				required:true,
				date:true,
				futureDate:true
			},
			exp_amt: {
		        required: true,
		        number: true,
		        noSpace: true
			},
			vendor_list: {
		        required: true,
		        
			},
			pay_mode: {
		        required: true,
		        
			},
					  },
		 messages: {
			 exp_date: {
				futureDate:'Past date not allowed'
			},
		 },
		  submitHandler:function(form){
			  event.preventDefault();
			
		  }
	});
	$('form[id="vendorForm"]').validate({
		  rules: {
			  ven:{
				required:true,
				maxlength: 30
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			
		  }
	});
	$('#expense_table').DataTable({
		"pageLength" : 40
	});
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	
	$("#ExpenseForm").submit(function(){
		alert("success");
		InsertExpense();
	});
	$("#vendorForm").submit(function(){
		alert("success");
		InsertVendor();
	});
	
	ExpenseList();
	loadvendor();
});


function InsertExpense(){
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
	alert(requestid);
	if(requestid==0){
	var formData=$("#ExpenseForm").serialize()+"&branch="+branchSession;
	//+"&branch="+branchSession;
	var relativeUrl = "/Expense/NewExpense";
	}
	else{
		var formData=$("#ExpenseForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Expense/EditExpense";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function ExpenseList(){
	function callback(responseData, textStatus, request){
		var table = $("#expense_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var date = responseData[i].exp_date;
			var amount = responseData[i].amt;
			var vendor = responseData[i].vend;
			var mode = responseData[i].pay_mode;
			
			table.row.add(
					[date,amount,vendor,mode,chck]).draw();
		}
		
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	//var formData = ''
	var relativeUrl = "/Expense/FetchAllExpense?branch="+branchSession;
			//"?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}


function InsertVendor(){
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
	alert(requestid);
	if(requestid==0){
	var formData=$("#vendorForm").serialize();
	//+"&branch="+branchSession;
	var relativeUrl = "/Expense/NewVendor";
	}
	/*else{
		var formData=$("#vendorForm").serialize();
		var relativeUrl = "/Expense/EditExpense";
	}*/
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function loadvendor() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			vendors.push('<option value="' + responseData[i].vendor + '" >'
							+ responseData[i].vendor + '</option>');
		}
		for (var i = 0; i < vendors.length; i++) {
			$('#vendor_list').append(vendors[i]);
			//$('.feestype').append(htmlCode[i]);
		}
	}

	function errorCallback(responseData, textStatus, request) {

	}

	var httpMethod = "GET";
	var relativeUrl = "/Expense/LoadVendor";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
} 

