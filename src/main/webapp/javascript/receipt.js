var mes;
var branchSession=sessionStorage.getItem("branch");
$(document).ready(function(){
	receiptNumber();
	//getCurrentDate();
	$("#stud_id").keyup(function() {
		var id=parseInt(document.getElementById('stud_id').value);
		event.preventDefault();
		SearchStudent(id);
	});
/*	$("#stud_id").keydown(function() {
		document.getElementById('stud_id').value="";
	});*/
	$("#receipt").click(function() {
		event.preventDefault();
		StudentReceipt();
	});
});

function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var Rollno=responseData.Rollno;
		var name=responseData.student_name;
		var contact=responseData.contact;
		var fees=responseData.fees;
		var stud_details=Rollno +" | "+name+ " | "+contact+ " | "+fees;
			document.getElementById('stud_details').value=stud_details;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/SearchStudent?id="+id+"&branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function receiptNumber(){
	var receipt_no=01;
	function callback(responseData,textStatus,request)
	{
		if(responseData==null||responseData=="")
			{
			document.getElementById('receipt_no').value=parseInt(receipt_no);
			}
		else{
			for (var i in responseData)
			{
				//alert(responseData[i].id);
				document.getElementById('receipt_no').value=parseInt(responseData[i].id)+1;
			}
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/FetchAllReceiptDetails";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function StudentReceipt(){
	alert("here");
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
	var formData=$("#receipt-form").serialize()+"&branch="+branchSession;
	console.log(formData);
	var relativeUrl = "/Receipt/ReceiptDetails";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}