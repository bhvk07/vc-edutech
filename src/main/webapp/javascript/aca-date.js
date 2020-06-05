$(document).ready(function() {
	
	$('#aca_start').on('click', function(){
		$('.form_date1').datetimepicker({
			format: 'd/m/Y', //date format
			timepicker: false,
			//dateFormat : 'YYYY-MM-DD',
			weekStart : 1,
			todayBtn : 1,
			autoclose : true,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			keepOpen: false,
			 

		});
		/*$(".form_date").datetimepicker();*/
	});
	$('#aca_end').on('click', function(){
		$('.form_date2').datetimepicker({
			format: 'd/m/Y', //date format
			timepicker: false,
			//dateFormat : 'YYYY-MM-DD',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			

		});
		/*$(".form_date").datetimepicker();*/
	});
	});