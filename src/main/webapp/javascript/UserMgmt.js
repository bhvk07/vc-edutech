var mes;
$(document).ready(function(){
	$('#UserMgmt_table').DataTable({
		"pageLength" : 40
	});
	
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	
	EmployeeList();
});
	
	function EmployeeList(){
		function callback(responseData, textStatus, request){
			var table = $("#UserMgmt_table").DataTable();
			var value = 0;
			table.rows().remove().draw();
			for ( var i in responseData) {
				var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
				var emp_role = responseData[i].role;
				var id = responseData[i].created_date;
				var emp_id = responseData[i].userid;
				var branch = responseData[i].branch;
				table.row.add(
						[chck,id,emp_id, emp_role,branch]).draw();
			}
			
		}
		
	
		function errorCallback(responseData, textStatus, request){
			var mes=responseData.responseJSON.message;
			showNotification("error",mes);
			
		}
		
		var httpMethod = "GET";
		//var formData = ''
		var relativeUrl = "/Employee/FetchAllEmployee";
		ajaxUnauthenticatedRequest(httpMethod, relativeUrl,null, callback,
				errorCallback);
		return false;
	}