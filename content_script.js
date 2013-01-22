
function requestUnlockPage(key, unlock_url) {
	console.log("key : " + key);
	console.log("unlock url : " + unlock_url);
	chrome.extension.sendMessage(null, { action:"request_unlock_page", key:key, unlock_url:unlock_url }, function(response) {
		console.log("unlock response : " + response);
	});
};

function requestRapPass(key) {
	console.log("base url for rap : " + key);
	chrome.extension.sendMessage(null, { action:"request_fetch_rap_pass", key:key }, function(response) {
		console.log("fetched rap pass : " + response);

		document.getElementsByName('exp_password')[0].setAttribute("value", response);
	});
};

function getParamFromUrl(str) {
    var p = new Object();
    var hashes = (str.indexOf('?')<0) ? new Array(): ((str.split('?'))[1].split('#'))[0].split('&');
    for(var i = 0; i <hashes.length; i++) {
        var hash = (hashes[i].indexOf('=')<0) ? new Array(hashes[i],'') : hashes[i].split('=');
        p[hash[0]] = hash[1];
    }
    return p;
};

function exploaderRapPass() {
	var key_ = $("div#acces a").first().text();
	var location_ = document.location.href;
	if(key_ == "URLロック元に戻る") {
		var params_ = getParamFromUrl(unescape($("div#acces a").first()[0].href));
		key_ = params_["url"].split('/')[2];
		requestRapPass(key_);
	} else {
		requestUnlockPage(key_, location_);
	}
}

$(function() {
	if(document.domain == "www.exploader.net") {
		exploaderRapPass();
	}
});
