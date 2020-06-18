var ids=new Array();
$(document).ready(function() {
	
	validateLogin();
	FetchAllEmployee();
	getAcademicYear();
	getFeesPackage();
	getAllDivision();
	getAllStandard();
	fetchAllBranch();
	$(".branch").val(branchSession);
	
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_standard_select').multiselect({
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
		  }
	});
	$("#btnDisplay").click(function(){
		viewAdmissionReport();
	});
	
	
	
});
function viewAdmissionReport(){
	document.getElementById("branch").disabled=false;
	var fees_package=new Array();
	var standard=new Array();
	var div=new Array();
	var adm_taken=new Array();
	alert($("#multi_standard_select").val());
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			fees_package.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_standard_select').options) {
		if (option.selected) {
			standard.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_div').options) {
		if (option.selected) {
			div.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_status_select').options) {
		if (option.selected) {
			adm_taken.push(option.value);
		}
	}
	if(div==""){
		div="null";
	}
	function callback(responseData, textStatus, request){
		var table = $("#admission-report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var invoice=responseData[i].invoice_no;
			var date=responseData[i].admission_date;
			var name=responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var fees_pack=responseData[i].adm_fees_pack;
			var net_total=responseData[i].fees;
			var grand_total=parseInt(responseData[i].fees)+parseInt(responseData[i].disccount);
			var payment=responseData[i].paid_fees;
			var balance=responseData[i].remain_fees;
				table.row.add(
						[  invoice, date, name ,fees_pack, net_total,grand_total, payment,balance]).draw();	
			//}
		}document.getElementById("branch").disabled=true;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
		var httpMethod = "POST";
		var formData = $("#AdmReportForm").serialize()+"&package="+fees_package+"&standard="+standard+"&division="+div
		+"&adm_taken_by="+adm_taken;
		var relativeUrl = "/Admission/AdmissionReport";	
		ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
		errorCallback);
	return false;
}
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
