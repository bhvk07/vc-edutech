var ids=new Array();
$(document).ready(function() {
	
	validateLogin();

	/*fetchAllBranch();*/
	/*getDesign();*/
	$(".branch").val(branchSession);
	
	
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
	$("#btnDisplay").click(function(){
		
	});
	
	
	
});


