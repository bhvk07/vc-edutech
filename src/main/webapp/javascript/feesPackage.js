var standardData=new Array();
var branchData=new Array();
$(document).ready(function() {
	loadFeesType();
	
	$("#feespackage").submit(function() {
		var a=getStandardData();
		var b=getBranchData();
		$('#standard .stdcheck').each(function(i, chk) {
			
			if(chk.checked){
			var standard=a.split(",");	
			standardData.push(standard[i]);
	        }
		});
		
		$('#branch .stdcheck').each(function(i, chk) {
	        if(chk.checked){
	        var	branch=b.split(",");
	        branchData.push(branch[i])
	        }
		});
		
		addNewFeesPackage(standardData,branchData);
	});
});
function getStandardData(){
		 var html_table_data = "";  
        var bRowStarted = true;  
        $('#standard tbody>tr').each(function () {  
            $('td', this).each(function () {  
                if (html_table_data.length == 0 || bRowStarted == true) {  
                    html_table_data += $(this).text();  
                    bRowStarted = false;  
                }  
                else 
                    html_table_data += " | " + $(this).text();  
            });  
            html_table_data += ",";  
            bRowStarted = true;  
	});
    return html_table_data;
}
function getBranchData(){
		 var html_table_data = "";  
       var bRowStarted = true;  
       $('#branch tbody>tr').each(function () {  
           $('td', this).each(function () {  
               if (html_table_data.length == 0 || bRowStarted == true) {  
                   html_table_data += $(this).text();  
                   bRowStarted = false;  
               }  
               else 
                   html_table_data += " | " + $(this).text();  
           });  
           html_table_data += ",";  
           bRowStarted = true;  
       });
       return html_table_data;
}


function addNewFeesPackage(standardData,branchData) {
	var table=document.getElementById("feestypetable");
	var rowCount=$('#feestypetable tr').length;
	console.log(rowCount);
	var fees_details=new Array;
	for (var i = 2; i <= rowCount; i++) {
        var feesType = $(table.rows.item(i).cells[0]).find('select').val();
        var feesTypeAmt = $(table.rows.item(i).cells[1]).find('input').val();
        var discount = $(table.rows.item(i).cells[2]).find('input').val();
        var total = $(table.rows.item(i).cells[5]).find('input').val();
        fees_details.push(feesType+"|"+feesTypeAmt+"|"+discount+"|"+total);   
	}

	function callback(responseData, textStatus, request) {

	}
	function errorCallback(responseData, textStatus, request) {

	}
	// $('#inputDisabledAmt').removeAttr('readonly');
	var formData = $("#feespackage").serialize()+"&standardData="+standardData
	+"&branchData="+branchData+"&fees_details="+fees_details;
	 console.log(formData);
	 var httpMethod = "POST";
	 var relativeUrl = "/feesType/getFeesType";
	//ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
	//errorCallback);
	return false;
}