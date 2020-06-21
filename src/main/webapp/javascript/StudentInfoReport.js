$(document).ready(function() {
	validateLogin();
	
	FetchAllEmployee();
	getFeesPackage();
	fetchAllBranch();
	getCaste();
	
	
	
	$('#multi_lead_source').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	$('#multi_caste').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_lead_stage').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	});
	$('form[id="StudentInfoForm"]').validate({
		
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
	
