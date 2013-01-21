
function requestRapPass(pass)
{
	console.log("rap pass : " + pass);
	document.getElementsByName('exp_password')[0].setAttribute("value", pass);
};

function requestUnlockPage(url) {
	console.log("unlock url : " + url);
	chrome.extension.sendRequest({ action : "request_unlock_page", url : url }, function(response) {
		console.log("unlock response : " + response);
	});
}

$(function() {
	acces = document.getElementById('acces').getElementsByTagName("a")[0];
	if(acces.innerText == "URLロック元に戻る") {
		rap_pass("hogehoge");
	} else {
		requestUnlockPage(acces.innerText);
	}
});
