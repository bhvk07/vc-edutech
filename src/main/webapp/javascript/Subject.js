var mes;
var requestid=0;
$(document).ready(function(){
	SubjectList();
	$('#subjecttable').DataTable({
		"pageLength" : 40
	});
	
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	$("#subject").submit(function(){
		createSubject();	
	});
	$("#edit").click(function(e){
		var table = $('#subjecttable').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			subject = table.rows({selected : true}).column(1).data()[i];
			timeline = table.rows({selected : true}).column(2).data()[i];
			loadSubject(subject,timeline,e);
			}
		});	
	});
	$("#cancel").click(function(){
		clearModal();	
	});
	
});


function createSubject(){
	function callback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
		clearModal();
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	alert(requestid);
	if(requestid==0){
	var formData=$("#subject").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Subject/NewSubject";
	}
	else{
		var formData=$("#subject").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Subject/EditSubject";
	}
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function SubjectList(){
	function callback(responseData, textStatus, request){
		var table = $("#subjecttable").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var subject = responseData[i].subject;
			var created_date = responseData[i].created_date;
			var timeline = responseData[i].timeline;
			
			table.row.add(
					[created_date,subject,timeline,chck]).draw();
		}
		
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	//var formData = ''
	var relativeUrl = "/Subject/FetchAllSubject?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
function loadSubject(subject,time,e){
	document.getElementById("subjectname").value=subject;
	document.getElementById("timeline").value=time;
	e.preventDefault();
	$('#subjectModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     });
}

function clearModal()
{
	document.getElementById("subjectname").value="";
	document.getElementById("timeline").value="";
	requestid=0;
}