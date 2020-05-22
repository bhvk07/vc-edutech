var standardData = new Array();
var branchData = new Array();
$(document).ready(function() {
	getFeesPackage();
	loadFeesType();
	loadBranchSpecificStandard();
	loadFeesPackage();
	$("#submit").click(function() {
		$('#standard input:checked').each(function () {
			   var std=$(this).closest('tr').find('td:nth-child(2)').text();
			   standardData.push(std);
		});
		$('#branchTable input:checked').each(function () {
			   var branch=$(this).closest('tr').find('td:nth-child(2)').text();
			   branchData.push(branch);
		});
		addNewFeesPackage(standardData, branchData);
	});
	$("#loadBranch").click(function(){
		var stdamt=0;
		$('input:checked').each(function () {
		   var std=$(this).closest('tr').find('td:nth-child(2)').text();
		   stdamt=stdamt+Number($(this).closest('tr').find('td:nth-child(3)').text());
		   document.getElementById("amount").value=stdamt;
		   document.getElementById("total-amt").value=stdamt;
		   document.getElementById("grand-t").value=stdamt;
		   document.getElementById("inputDisabledAmt").value=stdamt;
		   loadBranch(std);
	    });
	});
});
function addNewFeesPackage(standardData, branchData) {
	var table = document.getElementById("feestypetable");
	var rowCount = $('#feestypetable tr').length;
	var fees_details = new Array;
	for (var i = 1; i <= rowCount - 1; i++) {
		var feesType = $(table.rows.item(i).cells[0]).find('select').val();
		var feesTypeAmt = $(table.rows.item(i).cells[1]).find('input').val();
		var discount = $(table.rows.item(i).cells[2]).find('input').val();
		var total = $(table.rows.item(i).cells[5]).find('input').val();
		fees_details.push(feesType + "|" + feesTypeAmt + "|" + discount + "|"
				+ total);
	}
	document.getElementById("inputDisabledAmt").disabled=false;
	function callback(responseData, textStatus, request) {
		console.log("save");
		document.getElementById("inputDisabledAmt").disabled=true;
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not save");
	}
	var formData = $("#feespackage-form").serialize() + "&standardData="
			+ standardData + "&branchData=" + branchData + "&fees_details="
			+ fees_details;
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/FeesPackage/addNewFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


/*function loadFeesPackage() {

	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].feesPackage+"|" +responseData[i].total_amt+ '" >'
					+ responseData[i].feesPackage+"-" +responseData[i].total_amt + '</option>');
			$('#fees').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
*/
function loadBranchSpecificStandard(){
	var table = document.getElementById("standard");
	function callback(responseData, textStatus, request) {
		for(var i in responseData){
			
		var standardData=responseData[i];
		var standardData=standardData.split("|");
		var std=standardData[0];
		var stdamt=standardData[1];
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck">';

        var cell2 = row.insertCell(1);
        cell2.innerHTML = std;

        var cell3 = row.insertCell(2);
        cell3.innerHTML = stdamt;
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getBranchSpecificStandard?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function loadBranch(std){
	var table = document.getElementById("branchTable");
	function callback(responseData, textStatus, request) {
		for(var i in responseData){		
		var Branch=responseData[i];
		var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var cell1 = row.insertCell(0);
        cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck">';

        var cell2 = row.insertCell(1);
        cell2.innerHTML = Branch;
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/loadBranch?std="+std;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadFeesPackage() {

	function callback(responseData, textStatus, request) {
		var table = $("#feespackage").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			
			var date = responseData[i].created_date;
			var feesPackage = responseData[i].feesPackage;
			var branch = responseData[i].branch;
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
				+ responseData[i].id
				+ '"><label for="checkbox1"></label></span>';
			
			table.row.add(
					[date, feesPackage, branch, srno]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}