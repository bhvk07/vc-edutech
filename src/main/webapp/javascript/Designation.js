$(document).ready(function() {
	validateLogin();
	
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
			 
		  }
	});

	$("#cancelBtn").click(function() {
		clearModal()
	});
	


});