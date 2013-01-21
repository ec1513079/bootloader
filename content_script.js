
function requestRapPass(pass)
{
	console.log("rap pass : " + pass);
	document.getElementsByName('exp_password')[0].setAttribute("value", pass);
};

function requestUnlockPage(unlock_url, base_url) {
	console.log("unlock url : " + unlock_url + ", base url : " + base_url);
	chrome.extension.sendMessage(null, { action:"request_unlock_page", unlock_url:unlock_url, base_url:base_url }, function(response) {
		console.log("unlock response : " + response);
	});
};

$(function() {
	//acces = document.getElementById('acces').getElementsByTagName("a")[0];
	//if(acces.innerText == "URLロック元に戻る") {
	//	requestRapPass("hogehoge");
	//} else {
	//	requestUnlockPage(acces.innerText, document.location.href);
	//}

	//DEBUG->
	var acces = "http://dev.screw-axis.com/doc/chrome_extensions/tutorials/getting_started/";
	var loc   = "http://www.chromium.org/getting-involved/dev-channel#TOC-Mac";
	if(document.location.href == loc) { requestRapPass("hogehoge"); }
	if(acces.innerText == "URLロック元に戻る") { requestRapPass("hogehoge");
	} else { requestUnlockPage(acces, loc); }
	//DEBUG<-
});
