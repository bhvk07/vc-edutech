var mes;
var today=new Date();
var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
$(document).ready(function(){
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	$('form[id="receipt-form"]').validate({
		  rules: {
			stud_id: {
		        required: true,
		        digits: true,
		        noSpace: true
			},
			receipt_no: {
		        required: true,
		        digits: true,
		        noSpace: true
			},
			stud_details:{
				required: true,
				noSpace: true
			},
			received_amt:{
				required: true,
		        digits: true,
			},
			received_in:{
				required: true
			},
			trans_status:{
				required: true
			},
			enq_taken:{
				required: true
			},
			receipt_date:{
				required: true,
				date:true
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  StudentReceipt();
		  }
	});
	receiptNumber();
	FetchAllEmployee();
	
	//document.getElementById('receipt_date').value=date;
	$("#stud_id").focusout(function() {
		var id=document.getElementById('stud_id').value;
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
	$("#received_amt").focusout(function() {
		var table = document.getElementById("InstallmentTable");
		var received_mat=$("#received_amt").val();
		$(table.rows.item(1).cells[7]).find('input').val(received_mat);
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
		var installment=responseData.installment;
		var monthly_pay=installment.monthly_pay;
		var remain_fees=installment.remain_fees;
		if(monthly_pay!=""){
			var table = document.getElementById("InstallmentTable");
			var srno=0;
			var j=monthly_pay.length;
			for(var i=1;i<=j;i++)
				{
				var row = table.insertRow(i);
				 var cell1 = row.insertCell(0);
			        cell1.innerHTML = srno+1;
			        srno=srno+1;

			        var cell2 = row.insertCell(1);
			        cell2.innerHTML = responseData.invoice_no;
			        
			        var cell3 = row.insertCell(2);
			        cell3.innerHTML = installment.fees_title[i-1];
			        
			        var cell4 = row.insertCell(3);
			        cell4.innerHTML = responseData.fees;
			        
			        var cell5 = row.insertCell(4);
			        cell5.innerHTML = installment.due_date[i-1];
			        
			        var cell6 = row.insertCell(5);
			        cell6.innerHTML = monthly_pay[i-1];
			        
			        var cell7 = row.insertCell(6);
			        cell7.innerHTML = remain_fees[i-1];
			        
			        var cell8 = row.insertCell(7);
			        cell8.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control text" value="0"></td>';
			       // j=j-1;
				}
			document.getElementById("InstallmentTable").style.display = "block";
		}
		
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
	var table = document.getElementById("InstallmentTable");
	var rowCount = table.rows.length;
//	var value=$(table.rows.item(1).cells[6]).find('input').val();
	var due_amt=table.rows.item(1).cells[5].innerHTML;
	var due_date=table.rows[1].cells[4].innerHTML;
	alert(due_amt)
//	var
//	for(var i=1;i<rowCount;i++){
	
	/*if(value!="0")
		{*/
		
	//	}
//	}
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
	var formData;
	//if(due_date!=undefined){
		formData=$("#receipt-form").serialize()+"&due_amt="+due_amt+"&due_date="+due_date+"&branch="+branchSession;
//	}else{
//		formData=$("#receipt-form").serialize()+"&branch="+branchSession;
//	}
	console.log(formData);
	var relativeUrl = "/Receipt/ReceiptDetails";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}