
function requestUnlockPage(key, unlock_url_regexp) {
	console.log("key : " + key);
	console.log("unlock url : " + unlock_url_regexp);
	chrome.extension.sendMessage(null, { action:"request_unlock_page", key:key, unlock_url_regexp:unlock_url_regexp }, function(response) {
		console.log("unlock response : " + response);
	});
};

function requestRapPass(key, rapPassMethod) {
	console.log("base url for rap : " + key);
	chrome.extension.sendMessage(null, { action:"request_fetch_rap_pass", key:key }, function(response) {
		console.log("fetched rap pass : " + response);
		rapPassMethod(response);
	});
};

/************************************************
 * Util
 ************************************************/

function getParamsFromUrl(str) {
    var p = new Object();
    var hashes = (str.indexOf('?')<0) ? new Array(): ((str.split('?'))[1].split('#'))[0].split('&');
    for(var i = 0; i <hashes.length; i++) {
        var hash = (hashes[i].indexOf('=')<0) ? new Array(hashes[i],'') : hashes[i].split('=');
        p[hash[0]] = hash[1];
    }
    return p;
};

/************************************************
 * www.exploader.net and 2dbook.com
 ************************************************/

function exploaderRapPass() {
	var key_ = $("div#acces a").first().text();
	var location_ = document.location.href;
	if(key_ == "URLロック元に戻る") {
		var params_ = getParamsFromUrl(unescape($("div#acces a").first()[0].href));
		key_ = params_["url"].split('/')[2];
		requestRapPass(key_, function(pass){ $("input[name='exp_password']").val(pass); });
	} else {
		requestUnlockPage(key_, location_+"\\?session=[\\w]+");
	}
}

function twodbookRapPass() {

}

$(function() {
	if(document.domain == "www.exploader.net") {
		exploaderRapPass();
	} else if (document.domain == "2dbook.com") {
		twodbookRapPass();
	}
});
