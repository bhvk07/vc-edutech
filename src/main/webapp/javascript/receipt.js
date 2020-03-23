$(document).ready(function(){
	receiptNumber();
	//getCurrentDate();
	$("#stud_id_search").click(function() {
		var id=parseInt(document.getElementById('stud_id').value);
		event.preventDefault();
		SearchStudent(id);
	});
	/*$("#admission-form").submit(function() {
		event.preventDefault();
		StudentAdmission();
	});*/
});

function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var id=responseData.id;
		var name=responseData.student_name;
		var contact=responseData.contact;
		var fees=responseData.fees;
		var stud_details=id +" | "+name+ " | "+contact+ " | "+fees;
			document.getElementById('stud_details').value=stud_details;
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/SearchStudent?id="+id;
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
			document.getElementById('receipt_no').value=parseInt(initial_rno);
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
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/FetchAllReceiptDetails";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}