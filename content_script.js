
function requestRapPass(base_url) {
	console.log("base url for rap : " + base_url);
	chrome.extension.sendMessage(null, { action:"request_fetch_rap_pass", base_url:base_url }, function(response) {
		console.log("fetched rap pass : " + response);
		//document.getElementsByName('exp_password')[0].setAttribute("value", response);

		//DEBUG->
		document.getElementsByName('q')[0].setAttribute("value", response);
		//DEBUG<-
	});
};

function requestUnlockPage(unlock_url, base_url) {
	console.log("unlock url : " + unlock_url + ", base url : " + base_url);
	chrome.extension.sendMessage(null, { action:"request_unlock_page", unlock_url:unlock_url, base_url:base_url }, function(response) {
		console.log("unlock response : " + response);
	});
};

$(function() {
	//var acces_ = document.getElementById('acces').getElementsByTagName("a")[0];
	//var location_ = document.location.href;
	//if(acces.innerText == "URLロック元に戻る") {
	//	requestRapPass(location_);
	//} else {
	//	requestUnlockPage(acces_.innerText, location_);
	//}

	//DEBUG->
	var acces = "http://dev.screw-axis.com/doc/chrome_extensions/tutorials/getting_started/";
	var loc   = "http://www.chromium.org/getting-involved/dev-channel#TOC-Mac";
	if(document.location.href == loc) { requestRapPass("hogehoge.fuga"); return; }
	if(acces.innerText == "URLロック元に戻る") { requestRapPass("hogehoge.fuga"); } else { requestUnlockPage(acces, loc); }
	//DEBUG<-
});
