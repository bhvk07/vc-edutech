$(document).ready(function(){
	NonAdmittedStudent();
	admissionDetails();
});

function NonAdmittedStudent(){
	function callback(responseData,textStatus,request)
	{
		for (var i in responseData)
			{
			var htmlCode = '<option value="' + responseData[i].sname +":"+
			responseData[i].mname+":"+responseData[i].lname+'" >'
			+ responseData[i].id +" | "+responseData[i].sname +" "+
			responseData[i].mname+" "+responseData[i].lname+ " | "+"Non Admitted"+'</option>';
			$('#stud_name').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/NonAdmittedStudent";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function admissionDetails(){
	var initial_rno=01;
	var initial_regno=01;
	var initial_invoice=01;
	function callback(responseData,textStatus,request)
	{
		if(responseData==null||responseData=="")
			{
			document.getElementById('rno').value=initial_no;
			document.getElementById('regno').value=initial_regno;
			document.getElementById('invoice').value=initial_invoice;
			}
		else{
			for (var i in responseData)
			{
				document.getElementById('rno').value=responseData[i].Rollno+1;
				document.getElementById('regno').value=responseData[i].regno+1;
				document.getElementById('invoice').value=responseData[i].invoice_no+1;
			}
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		alert("Data not Found");
			// var message=responseData.response.JSON.message;
			// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/FetchAllAdmittedStudent";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}