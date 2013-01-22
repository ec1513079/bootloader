
function requestRapPass(key) {
	console.log("base url for rap : " + key);
	chrome.extension.sendMessage(null, { action:"request_fetch_rap_pass", key:key }, function(response) {
		console.log("fetched rap pass : " + response);

		document.getElementsByName('exp_password')[0].setAttribute("value", response);
	});
};

function requestUnlockPage(key, unlock_url) {
	console.log("key : " + key);
	console.log("unlock url : " + unlock_url);
	chrome.extension.sendMessage(null, { action:"request_unlock_page", key:key, unlock_url:unlock_url }, function(response) {
		console.log("unlock response : " + response);
	});
};

$(function() {
	var acces_ = document.getElementById('acces').getElementsByTagName("a")[0];
	var location_ = document.location.href;
	if(acces.innerText == "URLロック元に戻る") {
		requestRapPass(location_);
	} else {
		requestUnlockPage(acces_.innerText, location_);
	}
});
