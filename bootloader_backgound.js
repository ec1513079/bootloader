
function unlockPage(key, unlock_url_regexp, sender, sendResponse) {

	var url_ = getSearchUrlFromKey(key);
    console.log("XMLHttpRequest send : " + url_);

    var xhr_ = new XMLHttpRequest();
    xhr_.open("GET", url_, true);
    xhr_.onreadystatechange = function() {

    	  if (xhr_.readyState == 4) {

    	    var resp_ = xhr_.responseText;
    	    var regexp_ = new RegExp(unlock_url_regexp);
    	    var exec_ = (resp_.match(regexp_) || [])[0] || null;

    	    if(exec_) {
    	    	chrome.tabs.update(sender.tab.id, { url:exec_ });
    	    } else {
    	        showRedPageIcon(sender.tab.id);
    	    }

    		console.log("unlock page url : " + exec_);
    		sendResponse("unlock page url : " + exec_);
    	  }
    	}
    xhr_.send();

    showRedPageIcon(sender.tab.id);
	sendResponse("XMLHttpRequest send : " + url_);
};

function fetchRapPass(key, sender, sendResponse) {

	console.log("base domain for rap : " + key);
	var pass_ = getPassFromKey(key);

	if(pass_ != null && pass_ != "") {
		showGreenPageIcon(sender.tab.id);
		sendResponse(pass_);
	} else {
		showRedPageIcon(sender.tab.id);
		sendResponse("");
	}
};

/************************************************
 * Listener
 ************************************************/

function onMessageListener(message, sender, sendResponse) {

	if (settingBootloaderEnable() != "enable") {
		showGrayPageIcon(sender.tab.id);
		sendResponse("bootloader disable");
		return ;
	}

	switch (message.action) {

	case "request_unlock_page":
		unlockPage(message.key, message.unlock_url_regexp, sender, sendResponse);
		return;

	case "request_fetch_rap_pass":
		fetchRapPass(message.key, sender, sendResponse);
		return;

	default:
		break;
	}

	sendResponse("uncatch action onMessageListener : " + message.action);
};
chrome.extension.onMessage.addListener(onMessageListener);
