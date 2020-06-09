var mes;
var enqData;
var standardData;
var branchData;
var today = new Date();
var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
$(document).ready(function(){
	//admissionDetails();
	
	getAcademicYear();
	FetchAllEmployee();
	getAutoIncrementedDetails();
	getFeesPackage();
	getAllDivision();
	getCaste();
	fetchAllBranch();
	loadBranchSpecificStandard();
	$("#enq_taken").val(user);
	$("#current_date").val(date);
	$(".branch").val(branchSession);
	if(sessionStorage.getItem("admission")!=null){
		loadAdmissionData();
	}

	$("#enq_stud").focusout(function() {
		deletefeesTypeTableRow();
		var id=document.getElementById('enq_stud').value;
		event.preventDefault();
		console.log(id);
		SearchStudent(id);
	});
	$("#admission-form").submit(function() {
		event.preventDefault();
		StudentAdmission();
	});
	$("#feestypeform").submit(function() {
		event.preventDefault();
		addFeesType();
	});
	$("#EnquiryForm").submit(function() {
		event.preventDefault();
		AddNewEnquiryStudent();
	});
	$("#addEmployee").submit(function() {
		event.preventDefault();
		AddEmployee();
	});
	$("#feestype").submit(function() {
		// var token=sessionStorage.getItem("token");
		// validateLogin(token);
		//		 
		event.preventDefault();
		addFeesType();
	});
	var select = document.getElementById('fees');
	//var outputElem = document.getElementById('amount');
	select.addEventListener('change', function() {
		var feespack=select.value.split("|");
		alert(feespack[0]);
		getFeesPackageDetails(feespack[0]);
		/*var fees_amt=select.value.split("|");
		outputElem.value = fees_amt[1];
		document.getElementById('total-amt').value=fees_amt[1];
		document.getElementById('amt_installment').value=fees_amt[1];
		document.getElementById('grand-t').value=fees_amt[1];*/
	});
	$("#discount").focusout(function() {
		var amount = document.getElementById('amount').value;
		var discount = document.getElementById('discount').value;
		var final_amt=amount-discount;
		document.getElementById('total-amt').value=final_amt;
		document.getElementById('amt_installment').value=final_amt;
	});
	$('#feestypetable').on('click','.remove-row',function(e) {
		var val = $(this).closest('tr').find('#total-amt').val();
		document.getElementById("grand-t").value = document.getElementById("grand-t").value- val;
		document.getElementById('amt_installment').value=document.getElementById('grand-t').value;
		$(this).closest('tr').remove();
		});
	$('#feestypetable2').on('click','.remove-row',function(e) {
		var val = $(this).closest('tr').find('.totala').val();
		document.getElementById("grand-t2").value = document.getElementById("grand-t2").value- val;
		document.getElementById("inputDisabledAmt").value=document.getElementById("grand-t2").value;
		$(this).closest('tr').remove();
		});
	$("#loadBranch").click(function() {
				var stdarray = new Array();
				var stdamt = 0;
				$('input:checked').each(function() {
					var std = $(this).closest('tr').find('td:nth-child(2)').text();
					stdamt = stdamt+ Number($(this).closest('tr').find('td:nth-child(3)').text());
					document.getElementById("amount").value = stdamt;
					document.getElementById("total-amt").value = stdamt;
					document.getElementById("grand-t").value = stdamt;
					document.getElementById("inputDisabledAmt").value = stdamt;
					loadBranch(std);
					});
			});
	$("#feespackage-modal-form").submit(
			function() {
				$('#standard input:checked').each(
						function() {
							var std = $(this).closest('tr')
									.find('td:nth-child(2)')
									.text();
							standardData = new Array();
							standardData.push(std);
						});
				$('#branchTable input:checked').each(
						function() {
							var branch = $(this).closest('tr')
									.find('td:nth-child(2)')
									.text();
							branchData = new Array();
							branchData.push(branch);
						});
				addNewFeesPackage(standardData, branchData);
			});
	$("#cancel").click(function(){
		clearSession();
	})
});


function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var id=responseData.id;
		var name=responseData.sname +" "+responseData.fname+" "+responseData.lname;
		var contact=responseData.stud_cont;
		var status=responseData.status;
		var stud_details=id +" | "+name+ " | "+contact+ " | "+status;
		document.getElementById('stud_details').value=stud_details;
		enqData=new Array();
		enqData.push(responseData.fname);
		enqData.push(responseData.lname);
		enqData.push(responseData.mname);
		enqData.push(responseData.uid);
		enqData.push(responseData.dob);
		enqData.push(responseData.gender);
		enqData.push(responseData.caste);
		enqData.push(responseData.category);
		enqData.push(responseData.lang);
		enqData.push(responseData.father_cont);
		enqData.push(responseData.mother_cont);
		enqData.push(responseData.address);
		enqData.push(responseData.pin);
		enqData.push(responseData.email);
		enqData.push(responseData.w_app_no);
		enqData.push(responseData.sname);
		enqData.push(responseData.stud_cont);
		$("#fees").val(responseData.fees_pack);
		var feespack=responseData.feesPack;
/*		var html = '<tr><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'
			+ htmlCode
			+'</select><span class="input-group-addon" id="bhvk"><button type="button" id="add-btn" data-toggle="modal" data-target="#addFeesTypeModal" style="background-color:transparent; border:none; font-size:18px; color:blue; position:relative;"> +</button></span></div></div></td><td><input type="number" class="form-control amt" id="amount" placeholder="0.00" ></td><td><input type="number" class="form-control discount" value="0"></td><td><div class="form-group"><select name="distype" class="form-control"><option value="INR">INR</option></select></div></td> <td><input type="text" class="form-control" placeholder="NONE" ></td><td> <input type="text" class="form-control totala" id="total-amt" disabled></td><td><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row" class="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></td></tr>"';
*/		var feesdetails = feespack.fees_details;
		
		createFeesTypeRow(feesdetails,responseData.fees_pack);

			//alert(document.getElementById('stud_details').value);
	}
	function errorCallback(responseData, textStatus, request) {
		
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
		
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id="+id+"&branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAutoIncrementedDetails(){
	function callback(responseData,textStatus,request)
	{
		document.getElementById("ID_no").value=responseData.id_prefix+"-"+responseData.id_no;
		document.getElementById("invoice_no").value=responseData.invoice_prefix+"-"+responseData.invoice;
		document.getElementById("reg_no").value=responseData.reg_prefix+"-"+responseData.registration;
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAutoIncrementedDetails?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function StudentAdmission(){

	var table=document.getElementById("installment_table");
	var rowCount=$('#installment_table tr').length;
	var installment="installment details";
	for (var i = 1; i < rowCount-1; i++) {
        var date = $(table.rows.item(i).cells[0]).find('input').val();
        var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
        var amt = $(table.rows.item(i).cells[2]).find('input').val();
        installment=installment+","+date+"|"+fees_title+"|"+amt;   
	}
	var table=document.getElementById("feestypetable");
	var rowCount=$('#feestypetable tr').length;
	var feestypeDetails=new Array();
	var disc=0;
	var g_total=0;
	var newAmt;
	for (var i = 1; i < rowCount; i++) {
		// var date = $(table.rows.item(i).cells[0]).find('input').val();
	        var fees_title = $(table.rows.item(i).cells[0]).find('select').val();
	        var amt = $(table.rows.item(i).cells[1]).find('input').val();
	        var discount = $(table.rows.item(i).cells[2]).find('input').val();
	        var total = $(table.rows.item(i).cells[5]).find('input').val();
	        feestypeDetails.push(fees_title+"|"+amt+"|"+discount+"|"+total);
	        disc=disc+parseInt(discount);
	        g_total=g_total+parseInt(total);
	}
	newAmt=disc+"|"+g_total;
	alert(newAmt);
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData=$('#admission-form').serialize()+"&personalDetails="+enqData+"&feestypeDetails="+feestypeDetails+"&installment="+installment+"&newAmt="+newAmt+"&branch="+branchSession;
	alert(formData);
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
}

function AddNewEnquiryStudent(){
	function callback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message); alert(message);
		 */
	}
	var formData = $('#EnquiryForm').serialize()+"&branch="+branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Enquiry/EnquiryData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById("emp_type").disabled=false;
	var emp_type=document.getElementById("emp_type").value;
	document.getElementById("branch").disabled=false;
	var branch=document.getElementById("branch").value
	function callback(responseData, textStatus, request) {
		document.getElementById("emp_type").disabled=true;
		document.getElementById("branch").disabled=true;
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var formData = $("#addEmployee").serialize()+"&emp_type="+emp_type+"&branch="+branch;
	alert(formData);
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function addFeesType() {
	function callback(responseData,textStatus,request)
	{
		$("#feestypeModal").hide();
//		var mes=responseData.responseJSON.message;
//		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	formData =$('#feestypeform').serialize()+"&branch="+branchSession;
	alert(formData);
	relativeUrl = "/feesType/addNewFeesType";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
}
function getFeesPackageDetails(pack)
{
	function callback(responseData,textStatus,request)
	{
		var packdetails=responseData.fees_details;
		deletefeesTypeTableRow();
		createFeesTypeRow(packdetails,responseData.feesPackage+"|"+responseData.total_amt);
	}
	function errorCallback(responseData, textStatus, request) {
//		var mes=responseData.responseJSON.message;
//		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "POST";
	var formData = {
		pack : pack,
		branch : branchSession
	}
	var relativeUrl = "/FeesPackage/getFeesPackageData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function createFeesTypeRow(feesdetails,packagename){
	feesdetails = feesdetails.split(",");
	alert(feesdetails.length)
	for (var i = 0; i < feesdetails.length - 1; i++) {
		$("table #fee-details").append(html);
	}
	var table = document.getElementById("feestypetable");
	for (var i = 0; i < feesdetails.length; i++) {
		feespipeseperated = feesdetails[i].split("|");
		for (var j = 0; j < feespipeseperated.length; j++) {
			$(table.rows.item(i + 1).cells[0]).find('select').val(
					feespipeseperated[0]);
			$(table.rows.item(i + 1).cells[1]).find('input').val(
					feespipeseperated[1]);
			$(table.rows.item(i + 1).cells[2]).find('input').val(
					feespipeseperated[2]);
			$(table.rows.item(i + 1).cells[5]).find('input').val(
					feespipeseperated[3]);
		}
	}
	var fees=packagename.split("|");
	var feespackamt=fees[1];
	document.getElementById('grand-t').value=feespackamt;
	document.getElementById('amt_installment').value=document.getElementById('grand-t').value;
	
	
}
function deletefeesTypeTableRow(){
	var table = document.getElementById("feestypetable");
	var rowCount = table.rows.length-1
	 var i=1;
		while (rowCount > i) {
		document.getElementById("feestypetable").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
}
function deleteRoWFeesPackage2(){
	alert("hrtr");
	var table = document.getElementById("feestypetable2");
	var rowCount = table.rows.length-1
	 var i=1;
		while (rowCount > i) {
		document.getElementById("feestypetable2").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
}
function loadBranchSpecificStandard() {
	var table = document.getElementById("standard");

	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {

			var standardData = responseData[i];
			var standardData = standardData.split("|");
			var standard = standardData[0];
			var stdamt = standardData[1];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" id="stdcheck">';
			var cell2 = row.insertCell(1);
			cell2.innerHTML = standard;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = stdamt;
		}

	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getBranchSpecificStandard?branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadBranch(std) {
	var table = document.getElementById("branchTable");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("branchTable").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var Branch = responseData[i];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			if (Branch == branchSession) {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" checked>';
			} else {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" disabled>';
			}
			var cell2 = row.insertCell(1);
			cell2.innerHTML = Branch;
		}

	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/loadBranch?std=" + std;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function addNewFeesPackage(standardData, branchData) {
	var table = document.getElementById("feestypetable2");
	var rowCount = $('#feestypetable2 tr').length;
	var fees_details = new Array;
	for (var i = 1; i <= rowCount - 1; i++) {
		var feesType = $(table.rows.item(i).cells[0]).find('select').val();
		var feesTypeAmt = $(table.rows.item(i).cells[1]).find('input').val();
		var discount = $(table.rows.item(i).cells[2]).find('input').val();
		var total = $(table.rows.item(i).cells[5]).find('input').val();
		fees_details.push(feesType + "|" + feesTypeAmt + "|" + discount + "|"
				+ total);
	}
	document.getElementById("inputDisabledAmt").disabled = false;
	function callback(responseData, textStatus, request) {
		console.log("save");
		document.getElementById("inputDisabledAmt").disabled = true;
		deleteRoWFeesPackage2();
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not save");
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
		formData = $("#feespackage-modal-form").serialize() + "&standardData="
				+ standardData + "&branchData=" + branchData + "&fees_details="
				+ fees_details + "&createdby=" + user;
		relativeUrl = "/FeesPackage/addNewFeesPackage";
	alert(formData);
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function loadAdmissionData(){
	var admissionData=sessionStorage.getItem("admission");
	admissionData=admissionData.split(",");
	$("#stud_details").val(admissionData[0]+"|"+admissionData[1]+" "+admissionData[3]+" "+admissionData[2]+"|"+admissionData[4]+"|"+"Admitted");
	$("#enq_taken").val(admissionData[5]);
	$(".fees_package").val(admissionData[6]+"|"+admissionData[17]);
	$("#status").val(admissionData[7]);
	$("#current_date").val(admissionData[8]);
	document.getElementById("ID_no").value=admissionData[9];
	$("#reg_no").val(admissionData[10]);
	$("#division").val(admissionData[11]);
	$("#invoice_no").val(admissionData[12]);
	$("#admission_date").val(admissionData[13]);
	$("#acad_year").val(admissionData[14]);
	$("#join_date").val(admissionData[15]);
	
	feesdetails = admissionData[16].split("-");
	for (var i = 1; i < feesdetails.length - 1; i++) {
		$("table #fee-details").append(html);
	}
	var table = document.getElementById("feestypetable");
	for (var i = 1; i < feesdetails.length; i++) {
		feespipeseperated = feesdetails[i].split("|");
		for (var j = 0; j < feespipeseperated.length; j++) {
			$(table.rows.item(i).cells[0]).find('select').val(
					feespipeseperated[0]);
			$(table.rows.item(i).cells[1]).find('input').val(
					feespipeseperated[1]);
			$(table.rows.item(i).cells[2]).find('input').val(
					feespipeseperated[2]);
			$(table.rows.item(i).cells[5]).find('input').val(
					feespipeseperated[3]);
		}
	}
	document.getElementById('grand-t').value=admissionData[17];
		
	if(admissionData[18]==null){
		document.getElementById('amt_installment').value=document.getElementById('grand-t').value;	
	}
	else{
		alert("here");
		var html_Code='<tr><td><div class="form-group"><div class="input-group date form_date" id="demo" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2"><input class="form-control" size="16" id="display" type="text" value="" readonly> <span class="input-group-addon"><span class="fa fa-remove"></span></span> <span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" name="installlment_date" value="" /><br /></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control feestype" id="feestype">'+htmlCode+'</select> <span class="input-group-addon" id="bhvk"><button type="button" id="feestype" data-toggle="modal" data-target="#feestypeModal" style="background-color: transparent; border: none; font-size: 18px; color: blue; position: relative;">+</button></span></div></div></td><td><input type="text" class="form-control f-row" id="amt_installment" name="amt_installment"></td><td><input type="text" class="form-control"id="r_installment" name="r_installment" disabled></td></tr>';
		var monthly=admissionData[18].split("-");
		var due=admissionData[19].split("-");
		var title=admissionData[20].split("-");
		for (var i = 1; i < monthly.length ; i++) {
			$("table #i-details").append(html_Code);
		}
		var total_monthly_pay=0;
		var table = document.getElementById("installment_table");
		for (var i = 2; i <= monthly.length; i++) {
				$(table.rows.item(i).cells[0]).find('input').val(due[i-1]);
				$(table.rows.item(i).cells[1]).find('select').val(
						title[i-1]);
				$(table.rows.item(i).cells[2]).find('input').val(
						monthly[i-1]);
				total_monthly_pay+=parseInt(monthly[i-1]);
		}
		var paid_installment=parseInt(admissionData[17])-total_monthly_pay;
		$(table.rows.item(1).cells[2]).find('input').val(paid_installment);
	}
}

function clearSession(){
	sessionStorage.removeItem("admission");
	window.location.href = "admission-list.html";
}

/*

}*/