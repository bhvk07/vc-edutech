$(document).ready(function(){
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getSubject();
	$('#div').focusout(function(){
		var aca_year = document.getElementById('ay').value ;
		var std = document.getElementById('std').value ;
		var div = document.getElementById('div').value ;
		var sub = document.getElementById('sub').value ;
		document.getElementById('title').value = aca_year+"|"+std+"|"+sub+"|"+div;
	});
	
});
