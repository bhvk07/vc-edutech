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
		alert(token);
		var role = responseData.role;
		var name = responseData.name;
		
		if(role=="fd")
			{
			
			window.location.href="dashboard.html";
			localStorage.setItem("user",name);
			}
		else if(role=="fd")
			{
			
			window.location.href="dashboard.html";
			localstorage.setItem("user",name);
			}
		else
			{
			mesasge="Role Not Assign.";
			}
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