
$(document).ready(function(){
	showdat();
});
function showdat(){
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '/' +
	    ((''+month).length<2 ? '0' : '') + month + '/' +
	    ((''+day).length<2 ? '0' : '') + day;

	 var val = localStorage.getItem("amount");
	  document.getElementById('receivedAmount').innerHTML = val ;
	  document.getElementById('receiptno1').innerHTML = 'Receipt #'+ localStorage.getItem("rec_no1");
	  document.getElementById('receipt2').innerHTML = localStorage.getItem("rec_no1");
	  document.getElementById('stud').innerHTML = localStorage.getItem("stud_name");
	  document.getElementById('creatddate1').innerHTML = output;
	  document.getElementById('ReceiptDate1').innerHTML = output;
	  document.getElementById('receivedIn1').innerHTML = localStorage.getItem("rec_in");
	  document.getElementById('StudentName').innerHTML = localStorage.getItem("stud_name");
	  
}
/*const init = function displaydat(){
	var queryString = new Array();
	 if (window.location.search.split('?').length > 1) {
		 var params = window.location.search.split('?')[1].split('&');
         for (var i = 0; i < params.length; i++) {
             var key = params[i].split('=')[0];
             var value = decodeURIComponent(params[i].split('=')[1]);
             queryString[key] = value;
         }
         alert(queryString);
	 }
}

document.addEventListener('DOMContentLoaded', function(){
	init();
});*/
