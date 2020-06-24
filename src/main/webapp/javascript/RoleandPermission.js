$(document).ready(function(){
	validateLogin();
	$("#btnSubmit").click(function(){
		saveAllPermission();
	});
});

function saveAllPermission(){
	var permission = new Array();
	  $.each($("input[name='permission']:checked"), function(){
          permission.push($(this).val());
      });	
	  function callback(responseData, textStatus, request){
				var mes=responseData.responseJSON.message;
				showNotification("success",mes);
		}


		function errorCallback(responseData, textStatus, request){
			var mes=responseData.responseJSON.message;
			showNotification("error",mes);
		}

		var httpMethod = "POST";
		var formData=$("#RoleandPermissionForm").serialize()+"&permission="+permission+"&branch="+branchSession;
		alert(formData);
		var relativeUrl = "/RolePermisison/saveRolesPermission";

	  ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
	  errorCallback);
	  return false;
}