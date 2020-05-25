/**
 * 
 */
var host="http://localhost";
var port="8080";

var DESK="desk";
var ADMIN="ADMIN";

var branchSession=sessionStorage.getItem("branch");
var user=localStorage.getItem("user");
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
	url = baseUrl + "/VC/webapi";
	url = url + relativeUrl;
	var token = sessionStorage.getItem("token");
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

function fetchAllBranch() 
{
	function callback(responseData, textStatus, request) {

		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].Branch + '" >'
					+ responseData[i].Branch + '</option>';
			console.log(responseData[i].Branch);
			$('.branch').append(htmlCode);
		}
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getAllBranch";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function FetchAllEmployee() {
	function callback(responseData, textStatus, request) {

		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].emp_name + '" >'
					+ responseData[i].emp_name + '</option>';
			$('#enq_taken').append(htmlCode);
		}
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getFeesPackage() {

	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].feesPackage+"|" +responseData[i].total_amt+ '" >'
					+ responseData[i].feesPackage+"-" +responseData[i].total_amt + '</option>');
			$('#fees').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAcademicYear() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].aca_year +'" >'
					+ responseData[i].aca_year + '</option>');
			$('#acad_year').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/AcademicList?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}