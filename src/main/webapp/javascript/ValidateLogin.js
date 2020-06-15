/**
 * 
 */
function validateLogin() {
	var token=sessionStorage.getItem("token");
	if (token === undefined || token.trim() == "") {
		window.location.href = "login.html";
	} 
}

function logout() {
	$.session.clear();
	window.location.replace("../login.html");
}
