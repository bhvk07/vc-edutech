var branchSession=sessionStorage.getItem("branch");
$(document).ready(function(){
	loadSubject();
	getAllStandard();
	$('#multiple-checkboxes').multiselect({
        includeSelectAllOption: true,
      });
	$("#savestd").click(function(){
		getStandardData();
	});
	$("#stdamt").focusout(function(){
		document.getElementById("Amount").value=document.getElementById("stdamt").value;
		document.getElementById("Amount1").value=document.getElementById("stdamt").value;
		document.getElementById("Amount2").value=document.getElementById("stdamt").value;
	});
});

function getAllStandard() {
	function callback(responseData, textStatus, request) {
		var table = $("#stdtable").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var created_date = responseData[i].created_date;
			var standard = responseData[i].standard;
			var Branch = responseData[i].Branch;
			var stdamt = responseData[i].std_fees;
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
				+ responseData[i].id
				+ '"><label for="checkbox1"></label></span>';
			table.row.add(
					[  created_date, standard, Branch, stdamt, srno ]).draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/standard/getAllStandard?branch="+branchSession;

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function loadSubject(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].subject + '" >'
					+ responseData[i].subject+ + '</option>');
			$('#multiple-checkboxes').append(htmlCode);
		}
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	//var formData = ''
	var relativeUrl = "/Subject/FetchAllSubject";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}

function getStandardData(){
	// read subject multi select ddo data
	var selected="subjects";
	for (var option of document.getElementById('multiple-checkboxes').options) {
	    if (option.selected) {
	      selected+="|"+option.value;
	    }
	}
	//read branch table data
	var table = document.getElementById("BranchTable");
	var rowCount = $('#BranchTable tr').length;
	var fees=new Array();
	for (var i = 1; i <= rowCount - 1; i++) {
		fees.push($(table.rows.item(i).cells[2]).find('input').val());
	}
	var i=0;
	var html_table_data = "";
	var bRowStarted = true;
	$('#BranchTable tbody>tr').each(function() {
		$('td', this).each(function() {
			if (html_table_data.length == 0 || bRowStarted == true) {
				html_table_data += $(this).text();
				bRowStarted = false;
			} else
				html_table_data += $(this).text();
		});
		
		html_table_data +="|"+fees[i]+",";
		i++;
		bRowStarted = true;
	});
	var branchData="branch Details";
	$('#BranchTable .stdcheck').each(function(i, chk) {
		if (chk.checked) {
			var standard = html_table_data.split(",");
			branchData+=","+standard[i];
		}
	});
	addStandard(branchData,selected);
}
function addStandard(branchData,subject){	
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			console.log("suc");
		}
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "POST";
	var formData = $("#standard").serialize()+"&branchData="+branchData+"&sub="+subject;
	console.log(formData);
	var relativeUrl = "/standard/addStandard";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl,formData, callback,
			errorCallback);
	return false;
}