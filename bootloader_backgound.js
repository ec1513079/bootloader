
function fetchRapPass(base_url, sender, sendResponse) {

	console.log("base url for rap : " + base_url);
	var pass_ = getPassFromKey(base_url);

	if(pass_ != null && pass_ != "") {
		showGreenPageIcon(sender.tab.id);
		sendResponse(pass_);
	} else {
		showRedPageIcon(sender.tab.id);
		sendResponse("");
	}
};

function unlockPage(unlock_url, base_url, sender, sendResponse) {

    var xhr_ = new XMLHttpRequest();
    xhr_.open("GET", unlock_url, true);
    xhr_.onreadystatechange = function() {

    	  if (xhr_.readyState == 4) {

    	    //var resp_ = xhr_.responseText;
    	    //var regexe_ = new RegExp(base_url+"?[\\w=-]*");
    	    //var exec_ = (resp_.match(regexe_) || [])[0] || null;

    	    //DEBUG->
    		var resp_ = xhr_.responseText;
    	    var regexe_ = new RegExp(base_url+"[#\\w=-]*");
    	    var exec_ = (resp_.match(regexe_) || [])[0] || null;
    	    //DEBUG<-

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
    console.log("XMLHttpRequest send");
	sendResponse("XMLHttpRequest send : " + unlock_url);

    showRedPageIcon(sender.tab.id);
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
		unlockPage(message.unlock_url, message.base_url, sender, sendResponse);
		return;

	case "request_fetch_rap_pass":
		fetchRapPass(message.base_url, sender, sendResponse);
		return;

	default:
		break;
	}

	sendResponse("uncatch action onMessageListener : " + message.action);
};
chrome.extension.onMessage.addListener(onMessageListener);
