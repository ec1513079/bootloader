
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

function exploaderKey() {
	var params_   = getParamsFromUrl(unescape($("div#acces a").first()[0].href));
	var key_      = params_["url"];
	return key_;
}

function exploaderRapPass() {
	var key_      = exploaderKey();
	var location_ = document.location.href;
	if($("div#acces a").first().text() == "URLロック元に戻る") {
		requestRapPass(key_, function(pass){ $("input[name='exp_password']").val(pass); });
	} else if($("input.dlkey").is("*")) {
		requestRapPass(key_, function(pass){ $("input[name='exp_password']").val(pass); });
	} else if(document.location.href.indexOf("www.exploader.net/download") != -1) {
		requestUnlockPage(key_, location_+"\\?session=[\\w]+");
	}
}

function twodbookKey() {
	var key_ = $("div.info a[target='_blank']").first()[0].href;
	return key_;
}

function twodbookRapPass() {
	var key_ = twodbookKey();
	var location_ = document.location.href;
	if($("p.status").text() == "データはロックされていません") {
		requestRapPass(key_, function(pass){ $("input#dlkey").val(pass); });
	} else if(document.location.href.indexOf("2dbook.com/books") != -1) {
		requestUnlockPage(key_, location_+"/[\\w.]+");
	}
}

$(function() {
	if(document.domain == "www.exploader.net") {
		exploaderRapPass();
	} else if (document.domain == "2dbook.com") {
		twodbookRapPass();
	}
});

/************************************************
 * Listener
 ************************************************/

function onMessageListener(message, sender, sendResponse) {
	
	switch (message.action) {

	case "get_key_url":
	
		var key_url_ = "";
		if(document.domain == "www.exploader.net") {
			key_url_ = exploaderKey();
		} else if (document.domain == "2dbook.com") {
			key_url_ = twodbookKey();
		}
		sendResponse(key_url_);
		return;
		
	default:
		break;
	}

	sendResponse("uncatch action onMessageListener : " + message.action);
};
chrome.extension.onMessage.addListener(onMessageListener);

