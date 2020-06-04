var mes;
$(document).ready(function(){
	$('form[id="signin"]').validate({
		  rules: {
		    userid: {
		    	required:true
		    },
		    password: {
		      required: true
		    }
		  },
		  messages: {
			userid: {
				required:'This field is required'
			},
			password: {
				required:'This field is required'
		    }
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  attemptLogin();
		  }
	});
		 /* $("#btn-login").click(function(){
			  
		  });*/
});


function attemptLogin(){
	function callback(responseData,textStatus,request){
		var token=request.getResponseHeader('X-Authorization');
		sessionStorage.setItem("token", token);
		sessionStorage.setItem("branch",responseData.Branch)
		alert(token);
		var role = responseData.role;
		var name = responseData.name;
		if(role=="desk")
			{
			
			window.location.href="dashboard.html";
			localStorage.setItem("user",name);
			}
		else if(role=="desk")
			{
			
			window.location.href="dashboard.html";
			localstorage.setItem("user",name);
			}
		else
			{
			mesasge="Role Not Assign.";
			}
		LoginHistory();
	}
	
	function errorCallback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var formData = $('#signin').serialize();
	var httpMethod="POST";
	var relativeUrl="/user/login";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function LoginHistory(){
	function callback(responseData,textStatus,request){
	
	}
	function errorCallback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	/*var formData = $('#signin').serialize();*/
	var httpMethod="GET";
	var relativeUrl="/user/getLoginHistory?branch="+branchSession+"&user="+user;

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
