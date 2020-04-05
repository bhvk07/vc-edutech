/**
 * 
 */
var host="http://localhost";
var port="8080";

var DESK="desk";
var ADMIN="ADMIN";
function fetchBaseUrl(){
	return host+":"+port;
}
function showNotification(type, message) {
	new Noty({
		type : type,
		layout : 'topRight',
		text : message,
		timeout : 3000,
	}).show();
}

function ajaxUnauthenticatedRequest(httpMethod,relativeUrl,data
		,responseFunction,errorResponseFunction){
	
	var url="";
	var baseUrl=fetchBaseUrl();
	url=baseUrl+"/VC/webapi";
	url=url+relativeUrl;
	
	if(httpMethod=="GET" || httpMethod=="DELETE")
		{
			$.ajax({
				url:url,
				headers:{
					'Content-type':'application/json'
				},	
				type:httpMethod,
				async:false,
				success:function(responseData,textStatus,request)
				{
					responseFunction(responseData,textStatus,request);
				},
				error:function(responseData,textStatus,request)
				{
					errorResponseFunction(responseData,textStatus,request);
				}
			});
		}else if (httpMethod == "POST" || httpMethod == "PUT") {
			var formData = "";
			
			if (data != null) {
				formData = data;
				
			}
			$.ajax({
				url : url,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				type : httpMethod,
				data : formData,
				async:false,
				success : function(responseData, textStatus, request) {
					responseFunction(responseData, textStatus, request);
				},
				error : function(responseData, textStatus, request) {
					errorResponseFunction(responseData, textStatus, request);
				}
			});
		}
}

function ajaxAuthenticatedRequest(httpMethod, relativeUrl, data,
		responseFunction, errorResponseFunction) {
	var url = "";
	var baseUrl = fetchBaseUrl();
	url = baseUrl + "/joat/webapi";
	url = url + relativeUrl;
	var token = $.session.get('token');
	if (httpMethod == "GET" || httpMethod == "DELETE") {
		$.ajax({
			url : url,
			headers : {
				'Content-Type' : 'application/json'
			},
			type : httpMethod,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("X-Authorization", token);
			},
			async:false,
			success : function(responseData, textStatus, request) {
				responseFunction(responseData, textStatus, request);
			},
			error : function(responseData, textStatus, request) {
				errorResponseFunction(responseData, textStatus, request);
			}
		});
	} else if (httpMethod == "POST" || httpMethod == "PUT") {
		var formData = "";
		if (data != null) {
			formData = data;
		}
		$.ajax({
			url : url,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			type : httpMethod,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("X-Authorization", token);
			},
			data : formData,
			async:false,
			success : function(responseData, textStatus, request) {
				responseFunction(responseData, textStatus, request);
			},
			error : function(responseData, textStatus, request) {
				errorResponseFunction(responseData, textStatus, request);
			}
		});
	}
}