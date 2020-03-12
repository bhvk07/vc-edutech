/**
 * 
 */
function validateLogin(token) {
	if (token === undefined || token.trim() == "") {
		window.location.replace("../login.html");
	} 
}

function logout() {
	$.session.clear();
	window.location.replace("../login.html");
}
