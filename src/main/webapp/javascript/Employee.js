$(document).ready(function() {
	
	validateLogin();
	fetchAllBranch();
	getDesignation();
	fetchAllRole();
	FetchAllEmployee();
	
	EmployeeList();
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	});
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than your Date of birth.');
	

	$('form[id="add_employee"]').validate({

		rules : {

			emp_name : {
				required : true,
				letterswithspace : true

			},
			emp_unq_code : {
				required : true,
			},

			email : {
				required : true,
				email : true

			},
			address : {
				required : true,
			},
			contact : {
				required : true,
				digits : true,
				minlength : 10,
				maxlength : 10
			},
			dob : {
				required : true,
				date : true,
				futureDate : true
			},

			join_date : {
				required : true,
				date : true,
				greaterThan:"#dob"

			},
			design : {
				required : true
			},
		},
		messages : {

			contact : 'Please enter correct mobile number',
				dob:'Date of birth cannot be a future date'
		},
		submitHandler : function(form) {
			event.preventDefault();
			
		}
	});

/*	$('#employeeTable').DataTable({
		"pageLength" : 40
	});*/

	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});

});