//var designation;
$(document).ready(function() {
	validateLogin();
	fetchAllBranch();
	fetchAllEmployee();
	$(".branch").val(branchSession);
	
	$('#multi_emp_design').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('form[id="EmpReportForm"]').validate({
		
		 /* rules: {
		    
			  admission_from_date: {
		        required: true,
		       date:true,
		       minDate:true
		   },
		   admission_till_date:{
			 required:true,
			 date:true,
			 greaterThan:"#admission_till_date"
   
		   },
		   
		   
		   
		  },
		 messages: {
			 admission_from_date: {
				required:'Division is required',	
				minDate:'Date should be current or future date'
			},
			admission_till_date:'Enter valid date'
		  },
		  submitHandler:function(form){
			  event.preventDefault();
		  }*/
	});
	$("#btnDisplay").click(function(e){
		fetchEmployeeReport(e);
	});
	
	
	
});

function fetchAllEmployee(){
	//designation=new Array();
	function callback(responseData, textStatus, request){
		var table = $("#employee-report").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var branch = responseData[i].branch;
			var emp_name = responseData[i].emp_name;
			var emp_unq_code = responseData[i].emp_unq_code;
			var emp_type = responseData[i].emp_type;
			var design = responseData[i].design;
			var contact = responseData[i].contact;
			var email = responseData[i].email;
			var dob = responseData[i].dob;
			var join_date= responseData[i].join_date;
			table.row.add(
					[branch,emp_name,emp_unq_code,emp_type,design,contact,email,dob,join_date]).draw();
				//designation.push(design);
			}
		//loadDesignation();
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;

}
/*function loadDesignation(){
	for(var i=0;i<designation.length;i++){
		var htmlCode='<option value="'+designation[i]+'">'+designation[i]+'</option>';
		$("#multi_emp_design").append(htmlCode);
	}
}*/
function fetchEmployeeReport(e){
	var design=new Array()
	for (var option of document.getElementById('multi_emp_design').options) {
		if (option.selected) {
			design.push(option.value);
		}
	}
	var emp_name=document.getElementById("empname").value;
	function callback(responseData, textStatus, request){
		var table = $("#employee-report").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			var branch = responseData[i].branch;
			var emp_name = responseData[i].emp_name;
			var emp_unq_code = responseData[i].emp_unq_code;
			var emp_type = responseData[i].emp_type;
			var design = responseData[i].design;
			var contact = responseData[i].contact;
			var email = responseData[i].email;
			var dob = responseData[i].dob;
			var join_date= responseData[i].join_date;
			table.row.add(
					[branch,emp_name,emp_unq_code,emp_type,design,contact,email,dob,join_date]).draw();
			}
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "POST";
	var formData=$("#EmpReportForm").serialize()+"&design="+design+"&branch="+branchSession;
	var relativeUrl = "/Employee/FetchEmployeeReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
			errorCallback);
	return false;

}