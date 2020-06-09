var requestid=0;
$(document).ready(function(){
	
	
	jQuery.validator.addMethod("val", function(value, element) {
	    return this.optional(element) || /^[a-zA-Z0-9\s+]+$/i.test(value);
	}, "Please enter valid standard");
	
	
	$('form[id="standardForm"]').validate({
		
		
		  rules: {
		    
			  stdtname: {
		        required: true,
		        val: true
		   },
		   
		  
		   stdamt: {
		        required: true,
		        digits: true
		   },
		   subject: {
		        required: true,
		        
		   },
		   
		   
			
		  },
		 messages: {
			 stdtname: {
				required:'Please enter standard',	
				val:'Please enter valid standard'
			},
			stdamt: {
					required:'Please enter standard fees amount',	
					
				},
				
			
		
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  
			  
		  }
	});
getAllStandardData();
loadSubject();

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

$("#edit").click(function(e){
var table = $("#stdtable").DataTable();
$('table .cbCheck').each(function(i, chk) {
if (chk.checked==true) {
requestid=$(this).val();
var branch=table.rows({selected : true}).column(2).data()[i];
var standard=table.rows({selected : true}).column(1).data()[i];
var stdamt=table.rows({selected : true}).column(3).data()[i];
var subject=table.rows({selected : true}).column(4).data()[i];
loadStandard(branch,standard,stdamt,subject,e);
}
});
});
});
function getAllStandardData() {
function callback(responseData, textStatus, request) {
var table = $("#stdtable").DataTable();
var value = 0;
var allsub;
table.rows().remove().draw();
for ( var i in responseData) {
allsub=new Array();
var created_date = responseData[i].created_date;
var standard = responseData[i].standard;
var Branch = responseData[i].Branch;
var stdamt = responseData[i].std_fees;
var subject = responseData[i].subject;
var subject=subject.split("|");
for(var i=1;i<subject.length;i++){
allsub.push(subject[i]);
}
var subject=allsub;
var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
+ responseData[i].id
+ '"><label for="checkbox1"></label></span>';
table.row.add(
[  created_date, standard, Branch, stdamt,subject, srno ]).draw();
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
       cell1.innerHTML = '<div class="checkbox-custom checkbox-default checkbox-inline styled" style="margin-top: 0px;"> <input type="checkbox" id="select1" class="stdcheck" value="'+responseData[i].Branch+'"> </div>';

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
+ responseData[i].subject + '</option>');
$('#multiple-checkboxes').append(htmlCode);
}
}


function errorCallback(responseData, textStatus, request){
var mes=responseData.responseJSON.message;
showNotification("error",mes);

}

var httpMethod = "GET";
// var formData = ''
var relativeUrl = "/Subject/FetchAllSubject?branch="+branchSession;
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
alert(selected);
// read branch table data
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
alert(formData);
var relativeUrl = "/standard/addStandard";
/*ajaxUnauthenticatedRequest(httpMethod, relativeUrl,formData, callback,
errorCallback);
*/return false;
}

function loadStandard(branch,standard,stdamt,subject,e){
document.getElementById("stdtname").value=standard;
document.getElementById("stdamt").value=stdamt;
//$('#multiple-checkboxes').val(subject);
var select = document.getElementById("multiple-checkboxes");
    var count = 0;
    var i;

for(count = 0; count < subject.length; count += 1) {
    for(i = 0; i < select.options.length; i += 1) {
        if(select.options[i].value === subject[count]) {
        alert("here"+select.options[i].value);
            select.options[i].selected = true;
            alert(select.options[i].checked);
        }
    }
}
// var element=document.getElementById('multiple-checkboxes');
// for (var i = 0; i < element.options.length; i++) {
//    element.options[i].selected = subject.indexOf(element.options[i].value) >= 0;
// }

// Get Value
/*var selectedItens = Array.from(element.selectedOptions)
       .map(option => option.value)*/
/*for(var i in subject) {
   var optionVal = subject[i];
   $("select").find("option[value="+optionVal+"]").prop("selected", "selected");
}
$("select").multiselect('reload');*/
/*for (var option of document.getElementById('multiple-checkboxes').options) {
  option.selected=false;
alert(option.value+" "+option.selected);
for(var i=0;i<subject.length;i++){    
if(option.value==subject[i])
{
option.selected=true;
}
  }
}*/
/*if (option.selected) {
     selected+="|"+option.value;
   }*/
e.preventDefault();
$('#standardmodal').modal({
        show: true,
        backdrop: 'static',
        keyboard: true
     });
}
