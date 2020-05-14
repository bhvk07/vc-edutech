var standardData = new Array();
var branchData = new Array();
$(document).ready(function() {
	loadFeesType();
	loadFeesPackage();
	getFeesPackage();
	$("#feespackage").submit(function() {
		var a = getStandardData();
		var b = getBranchData();
		$('#standard .stdcheck').each(function(i, chk) {

			if (chk.checked) {
				var standard = a.split(",");
				standardData.push(standard[i]);
			}
		});

		$('#branch .stdcheck').each(function(i, chk) {
			if (chk.checked) {
				var branch = b.split(",");
				branchData.push(branch[i])
			}
		});

		addNewFeesPackage(standardData, branchData);
	});
});
function getStandardData() {
	var html_table_data = "";
	var bRowStarted = true;
	$('#standard tbody>tr').each(function() {
		$('td', this).each(function() {
			if (html_table_data.length == 0 || bRowStarted == true) {
				html_table_data += $(this).text();
				bRowStarted = false;
			} else
				html_table_data += " | " + $(this).text();
		});
		html_table_data += ",";
		bRowStarted = true;
	});
	return html_table_data;
}
function getBranchData() {
	var html_table_data = "";
	var bRowStarted = true;
	$('#branch tbody>tr').each(function() {
		$('td', this).each(function() {
			if (html_table_data.length == 0 || bRowStarted == true) {
				html_table_data += $(this).text();
				bRowStarted = false;
			} else
				html_table_data += " | " + $(this).text();
		});
		html_table_data += ",";
		bRowStarted = true;
	});
	return html_table_data;
}

function addNewFeesPackage(standardData, branchData) {
	var table = document.getElementById("feestypetable");
	var rowCount = $('#feestypetable tr').length;
	console.log(rowCount);
	var fees_details = new Array;
	for (var i = 1; i <= rowCount - 1; i++) {
		var feesType = $(table.rows.item(i).cells[0]).find('select').val();
		var feesTypeAmt = $(table.rows.item(i).cells[1]).find('input').val();
		var discount = $(table.rows.item(i).cells[2]).find('input').val();
		var total = $(table.rows.item(i).cells[5]).find('input').val();
		fees_details.push(feesType + "|" + feesTypeAmt + "|" + discount + "|"
				+ total);
	}

	function callback(responseData, textStatus, request) {
		console.log("save");
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not save");
	}
	// $('#inputDisabledAmt').removeAttr('readonly');
	var formData = $("#feespackage").serialize() + "&standardData="
			+ standardData + "&branchData=" + branchData + "&fees_details="
			+ fees_details;
	console.log(formData);
	var httpMethod = "POST";
	var relativeUrl = "/FeesPackage/addNewFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function loadFeesPackage() {

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
	var relativeUrl = "/FeesPackage/getFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getFeesPackage() {

	function callback(responseData, textStatus, request) {
		var table = $("#form1").DataTable();
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
	var relativeUrl = "/FeesPackage/getFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}