var ids=new Array();
$(document).ready(function() {
	
	
	
	$('form[id="getPromoteData"]').validate({
		
		
		  rules: {
		    
			  acad_year: {
		        required: true,     
		   },
		   standard: {
		        required: true,
		      },
		      division: {
			        required: true,     
			   },
			   multi_status_select: {
			        required: true,
			      },
				
		  },
		 messages: {
			 multi_status_select: {
				required:'Please select status',		
			},
			
			
		
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			 
			  
		  }
	});
	
	
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getFeesPackage();
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$("#btnDisplay").click(function(){
		getPromoteData();
	});
	$("#promote_student").click(function(){
		$("input:checkbox[name=type]:checked").each(function() {
			ids.push($(this).val())
		});
		promoteStudent(ids);
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

function getPromoteData() {
	var selectedStatus="";
	for (var option of document.getElementById('multi_status_select').options) {
	    if (option.selected==true) {
	    	selectedStatus=option.value;
	    	}
	}
	function callback(responseData, textStatus, request) {
		var table = $('#promotion_table').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var id = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var stud_name = responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var standard = responseData[i].standard;
			var division = responseData[i].division;
			var acad_year = responseData[i].acad_year;
			table.row.add([ id, stud_name, standard, division, acad_year ]).draw();
			document.getElementById("promotion").style.display="block";
		}
	}
	function errorCallback(responseData, textStatus, request) {
		
		  var mes = responseData.responseJSON.message;
		  showNotification("error", mes);
	}
	var formData = $("#getPromoteData").serialize()+"&selectedStatus="+selectedStatus+
	"&branch="+branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Admission/getPromotionData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function promoteStudent(id){
	alert(id);
	function callback(responseData, textStatus, request) {
		var table = $('#promotion_table').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var id = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var stud_name = responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var standard = responseData[i].standard;
			var division = responseData[i].division;
			var acad_year = responseData[i].acad_year;
			table.row.add([ id, stud_name, standard, division, acad_year ]).draw();
			document.getElementById("promotion").style.display="block";
		}
	}
	function errorCallback(responseData, textStatus, request) {
		/*
		 * var mes = responseData.responseJSON.message;
		 * showNotification("error", mes);
		 */
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#PromoteDataForm").serialize()+"&id="+id+"&user="+user+
	"&branch="+branchSession;
	alert(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Admission/StudentPromotion";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}