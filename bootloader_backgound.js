
function unlockPage(unlock_url, base_url, sender, sendResponse) {

    var xhr_ = new XMLHttpRequest();
    xhr_.open("GET", unlock_url, true);
    xhr_.onreadystatechange = function() {

    	  if (xhr_.readyState == 4) {

    	    var resp_ = xhr_.responseText;
    	    //var regexe_ = new RegExp(base_url+"?[a-bA-B0-9=]*");
    	    var regexe_ = new RegExp(base_url+"#[\\w=-]*");
    	    var exec_ = (resp_.match(regexe_) || [])[0] || null;

    	    //(/ab(c+)/.exec('abccc') || [])[1] || null
    		//http://dev.screw-axis.com/doc/chrome_extensions/tutorials/getting_started/

    	    if(exec_) {
    	    	chrome.tabs.update(sender.tab.id, { url:exec_ });
        		showGreenPageIcon(sender.tab.id);
    	    } else {
    	        showRedPageIcon(sender.tab.id);
    	    }

    		console.log("unlock page url : " + exec_);
    		sendResponse("unlock page url : " + exec_);
    	  }
    	}
    xhr_.send();
    console.log("XMLHttpRequest Send");

    showRedPageIcon(sender.tab.id);
};

/************************************************
 * Listener
 ************************************************/

function onMessageListener(message, sender, sendResponse) {

	if (settingBootloaderEnable() != "enable") {
		sendResponse("bootloader disable");
		return ;
	}

	switch (message.action) {
	case "request_unlock_page":
		unlockPage(message.unlock_url, message.base_url, sender, sendResponse);
		return;

	default:
		break;
	}

	sendResponse("uncatch action onMessageListener : " + message.action);
};

chrome.extension.onMessage.addListener(onMessageListener);
