
function hidePageIcon(tab_id) {
	chrome.pageAction.hide(tab_id);
};

function showGreenPageIcon(tab_id) {
	if (isSettingBootloaderEnable()) {
		chrome.pageAction.setIcon({ tabId:tab_id, path:"img/icon-19-on.png"});
		chrome.pageAction.show(tab_id);
	} else {
		showGrayPageIcon(tab_id);
	}
};

function showRedPageIcon(tab_id) {
	if (isSettingBootloaderEnable()) {
		chrome.pageAction.setIcon({ tabId:tab_id, path:"img/icon-19-off.png"});
		chrome.pageAction.show(tab_id);
	} else {
		showGrayPageIcon(tab_id);
	}
};

function showGrayPageIcon(tab_id) {
	chrome.pageAction.setIcon({ tabId:tab_id, path:"img/icon-19-disable.png"});
	chrome.pageAction.show(tab_id);
};


/************************************************
 * Listener
 ************************************************/

//function pageActionOnClickedListener(tab) {
//	if (isSettingBootloaderEnable()) {
//		settingBootloaderEnable("disable");
//		showGrayPageIcon(tab.id);
//	} else {
//		settingBootloaderEnable("enable");
//		showRedPageIcon(tab.id);
//	}
//}
//chrome.pageAction.onClicked.addListener(pageActionOnClickedListener);