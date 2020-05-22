
$(document).ready(function(){
	loadSubject();
	getAllStandard();
	loadBranch();
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

function loadBranch() {
	function callback(responseData, textStatus, request) {
		var table = document.getElementById("BranchTable");
		
		for(var i in responseData){
			var rowCount = table.rows.length;
	        var row = table.insertRow(rowCount);

	        var cell1 = row.insertCell(0);
	        cell1.innerHTML = '<div class="checkbox-custom checkbox-default checkbox-inline styled" style="margin-top: 0px;"> <input type="checkbox" id="select1" class="stdcheck"> </div>';

	        var cell2 = row.insertCell(1);
	        cell2.innerHTML = responseData[i].Branch;

	        var cell3 = row.insertCell(2);
	        cell3.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control text" value="0"></td>';
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
	var relativeUrl = "/branch/getAllBranch";

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
	$('#BranchTable .stdcheck').each(function(i, chk) {
		if (chk.checked) {
			var branch=document.getElementById("BranchTable").rows[i+1].cells[1].innerHTML;
			var branchamt=$(table.rows.item(i+1).cells[2]).find('input').val();
			fees.push(branch+"|"+branchamt);
		}
	});
	addStandard(fees,selected);
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