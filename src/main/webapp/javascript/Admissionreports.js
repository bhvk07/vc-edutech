var ids=new Array();
$(document).ready(function() {
	
	
	FetchAllEmployee();
	getAcademicYear();
	getFeesPackage();
	getAllDivision();
	getAllStandard();
	
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	

	$('#multi_div').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	
	jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than from date.');
	
	
	
	$('form[id="AdmReportForm"]').validate({
		
		  rules: {
		    
			  admission_from_date: {
		        required: true,
		       date:required,
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
			  InsertDivision();
		  }
	});
	
	
	
	
});
$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		var links = this.el.find('.content-entry .title-promote');
		links.on('click', {
			el : this.el,
			multiple : this.multiple
		}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		/* alert(e.data); */
		$this = $(this), $next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.accordion-content').not($next).slideUp().parent()
					.removeClass('open');
		}
		;
	}
	var accordion = new Accordion($('.accordion-container'), false);
});

$('.title-promote').on('click', function(event) {
	if (!$(event.target).closest('#accordion').length) {
		$this.parent().toggleClass('open');
	}
});
